export interface IFileStorageService {
  startResumableUpload(fileName: string): Promise<string>;
  uploadChunk(uploadUrl: string, chunk: Buffer): Promise<void>;
  finalizeAudioUpload(fileName: string): Promise<void>;
}
