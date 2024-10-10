import { IStorageService } from "../storage/storage.interface";

export class FileUploadService {
  constructor(private storageService: IStorageService) {}

  async upload(fileData: string, fileType: string): Promise<string> {
    return this.storageService.uploadFile(fileData, fileType);
  }
}
