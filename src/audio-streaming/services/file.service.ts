import { Injectable } from '@nestjs/common';
import { GoogleCloudStorageService } from './google-cloud-storage.service';

@Injectable()
export class FileService {
  constructor(private readonly storageService: GoogleCloudStorageService) {}

  /**
   * Start a resumable upload session for the file.
   * @param fileName - The name of the file to upload.
   * @returns The resumable upload session URL.
   */
  async startUpload(fileName: string): Promise<string> {
    return this.storageService.startResumableUpload(fileName);
  }

  /**
   * Upload a chunk of data to the resumable upload session.
   * @param uploadUrl - The resumable upload session URL.
   * @param chunk - The chunk of data to upload (Buffer).
   */
  async uploadAudioChunk(uploadUrl: string, chunk: Buffer): Promise<void> {
    await this.storageService.uploadChunk(uploadUrl, chunk);
  }

  /**
   * Finalize the file upload by clearing any resources related to it.
   * @param fileName - The name of the file being uploaded.
   */
  finalizeAudioUpload(fileName: string): void {
    console.log(`Upload finalized for file: ${fileName}`);
  }
}
