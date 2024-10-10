import { parseFormData } from '../../src/utils';
import { APIGatewayEvent, APIGatewayProxyEvent } from 'aws-lambda';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import streamToPromise from 'stream-to-promise';

describe('parseFormData (real implementation)', () => {
  const createMockEvent = (body: Buffer, contentType: string): APIGatewayProxyEvent => ({
    body: body.toString('base64'),
    headers: { 'content-type': contentType },
    isBase64Encoded: true,
    httpMethod: 'POST',
    path: '/upload',
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: '',
    multiValueHeaders: {}
  });

  it('should parse form data with a file correctly', async () => {
    // Crea un archivo simulado
    const form = new FormData();
    const testFilePath = path.join(__dirname, 'test.jpg');
    fs.writeFileSync(testFilePath, 'Hello, World!');

    form.append('name', 'Test');
    form.append('file', fs.createReadStream(testFilePath), 'test.jpg'); // Agrega nombre del archivo

    // Convierte el stream del form-data en un buffer y obtiene el Content-Type
    const formDataBody = await streamToPromise(form); // Convierte a Buffer
    const contentType = form.getHeaders()['content-type'];

    const mockEvent = createMockEvent(formDataBody, contentType);

    const result = await parseFormData(mockEvent);

    expect(result.fields).toEqual({ name: 'Test' });

    expect(result.files.file).toBeDefined();

    const fileContent = Buffer.from(result.files.file, 'base64').toString();
    expect(fileContent).toBe('Hello, World!');

    // Limpia el archivo simulado
    fs.unlinkSync(testFilePath);
  });

  it('should throw an error for missing multipart content type', async () => {
    const mockEvent = {
      body: 'some-data',
      headers: { 'content-type': 'text/plain' }, // Content-Type incorrecto
      isBase64Encoded: false,
    } as unknown as APIGatewayEvent;

    await expect(parseFormData(mockEvent)).rejects.toThrow('Missing Content-Type: multipart/form-data');
  });
});
