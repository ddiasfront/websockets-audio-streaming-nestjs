import { Injectable } from '@nestjs/common';
import { CreateResumableUploadOptions, Storage } from '@google-cloud/storage';
import { PassThrough } from 'stream';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleCloudStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>(
      'GOOGLE_CLOUD_STORAGE_BUCKET',
    );

    // Load credentials using environment variables
    const credentials = {
      client_email: this.configService.get<string>('GOOGLE_CLIENT_EMAIL'),
      private_key: this.configService
        .get<string>('GOOGLE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
    };

    this.storage = new Storage({
      projectId: this.configService.get<string>('GOOGLE_CLOUD_PROJECT'),
      credentials,
    });
  }

  /**
   * Start a resumable upload session for a file.
   * This returns a URL to which chunks can be uploaded.
   * @param fileName - The name of the file to upload.
   * @returns A resumable upload session URL.
   */
  async startResumableUpload(fileName: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    const options: CreateResumableUploadOptions = {
      origin: '*',
    };

    const [uploadUrl] = await file.createResumableUpload(options);
    return uploadUrl; // Return the resumable upload session URL
  }

  /**
   * Upload a chunk of data to an existing resumable upload session.
   * @param uploadUrl - The resumable upload session URL.
   * @param chunk - The chunk of data to upload (Buffer).
   */
  async uploadChunk(uploadUrl: string, chunk: Buffer): Promise<void> {
    const passThroughStream = new PassThrough();
    passThroughStream.end(chunk); // Directly write and end stream with the chunk

    try {
      await axios.put(uploadUrl, passThroughStream, {
        headers: {
          'Content-Length': chunk.length,
          'Content-Type': 'application/octet-stream',
        },
      });
    } catch (error) {
      console.error(
        'Error uploading chunk:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to upload chunk');
    }
  }
}
