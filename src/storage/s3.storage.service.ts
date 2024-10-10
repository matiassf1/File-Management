import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from 'uuid';
import { getFileExtensionFromMimeType } from "../utils";
import { IStorageService } from "./storage.interface";

const s3 = new S3Client({ region: "us-east-1" });

export class S3StorageService implements IStorageService {
  private bucketName = 'test-sponsors-bucket';

  async uploadFile(fileData: string, fileType: string): Promise<string> {
    const fileExtension = getFileExtensionFromMimeType(fileType);
    const fileKey = `uploads/${uuid()}.${fileExtension}`;
    const buffer = Buffer.from(fileData, 'base64');

    await s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: buffer,
        ContentType: fileType,
      })
    );

    return `https://test-sponsors-bucket.s3.amazonaws.com/${fileKey}`;
  }
}
