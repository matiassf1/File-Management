export interface IStorageService {
    uploadFile(fileData: string, fileType: string): Promise<string>;
  }
  