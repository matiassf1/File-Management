import Busboy from 'busboy';
import { APIGatewayProxyEvent } from "aws-lambda";
import { ParsedFormData } from "./types";
import { getContentType } from './getContentType';
import { getFileExtensionFromMimeType } from './getFileExtensionFromMimeType';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const parseFormData = (event: APIGatewayProxyEvent): Promise<ParsedFormData> => {
  return new Promise((resolve, reject) => {
    const contentType = getContentType(event);
    console.log(contentType);

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return reject(new Error("Missing Content-Type: multipart/form-data"));
    }

    const busboy = Busboy({ headers: { 'content-type': contentType } });
    const result: ParsedFormData = { files: {}, fields: {} };

    busboy.on('file', (fieldname, file, info) => {
      const { mimeType, filename } = info;
      const buffers: Buffer[] = [];
      let fileSize = 0;

      try {
        const fileExtension = getFileExtensionFromMimeType(mimeType);

        if (!fileExtension) {
          return file.resume();
        }
      } catch (error) {
        return file.resume();
      }

      file.on('data', (data: Buffer) => {
        fileSize += data.length;
        buffers.push(data);
        
        if (fileSize > MAX_FILE_SIZE) {
          return file.resume();
        }
      });

      file.on('end', () => {
        if (fileSize <= MAX_FILE_SIZE) {
          result.files[fieldname] = Buffer.concat(buffers).toString('base64');
        }
      });
    });

    busboy.on('field', (fieldname, value) => {
      result.fields[fieldname] = value;
    });

    busboy.on('finish', () => resolve(result));
    busboy.on('error', (error) => reject(error));

    const bufferBody = event.body ? Buffer.from(event.body, 'base64') : null;
    busboy.end(bufferBody);
  });
};
