// import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { sponsorController } from '../src/controllers/sponsor.controller';
// import { getSponsorById, getAllSponsors, createSponsor, updateSponsor, deleteSponsor } from '../src/services/sponsor.service';
// import { parseFormData } from '../src/utils/parseFormData';
// import { constructResponse } from '../src/utils/constructResponse';

// // Mock the services
// jest.mock('../src/services/sponsor.service');
// jest.mock('../src/utils/constructResponse');
// jest.mock('../src/utils/parseFormData');

// describe('Sponsor Controller', () => {
//   let event: Partial<APIGatewayEvent>;

//   beforeEach(() => {
//     event = {
//       httpMethod: 'GET',
//       queryStringParameters: {},
//       body: '',
//     };
//   });

//   it('should return a sponsor by ID', async () => {
//     const mockSponsor = { id: '1', name: 'Test Sponsor' };
//     (getSponsorById as jest.Mock).mockResolvedValue(mockSponsor);

//     event.queryStringParameters = { id: '1' };
//     event.httpMethod = 'GET';

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual(mockSponsor);
//   });

//   it('should return all sponsors', async () => {
//     const mockSponsors = [
//       { id: '1', name: 'Test Sponsor 1' },
//       { id: '2', name: 'Test Sponsor 2' }
//     ];
//     (getAllSponsors as jest.Mock).mockResolvedValue(mockSponsors);

//     event.httpMethod = 'GET';

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual(mockSponsors);
//   });

//   it('should create a new sponsor', async () => {
//     const mockNewSponsor = { id: '1', name: 'New Sponsor', image: 'image-url', logo: 'logo-url' };
//     (createSponsor as jest.Mock).mockResolvedValue(mockNewSponsor);

//     const mockFormData = { files: { image: 'test-image' }, fields: { name: 'New Sponsor' } };
//     (parseFormData as jest.Mock).mockResolvedValue(mockFormData);

//     event.httpMethod = 'POST';

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(201);
//     expect(JSON.parse(response.body)).toEqual(mockNewSponsor);
//   });

//   it('should update a sponsor by ID', async () => {
//     const mockUpdatedSponsor = { id: '1', name: 'Updated Sponsor', image: 'updated-image-url' };
//     (updateSponsor as jest.Mock).mockResolvedValue(mockUpdatedSponsor);

//     const mockFormData = { files: { image: 'updated-image' }, fields: { name: 'Updated Sponsor' } };
//     (parseFormData as jest.Mock).mockResolvedValue(mockFormData);

//     event.httpMethod = 'PUT';
//     event.queryStringParameters = { id: '1' };

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual({ message: 'Sponsor updated successfully.' });
//   });

//   it('should delete a sponsor by ID', async () => {
//     (deleteSponsor as jest.Mock).mockResolvedValue(null);

//     event.httpMethod = 'DELETE';
//     event.queryStringParameters = { id: '1' };

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(204);
//     expect(response.body).toBeNull();
//   });

//   it('should return 404 if sponsor not found', async () => {
//     (getSponsorById as jest.Mock).mockResolvedValue(null);

//     event.queryStringParameters = { id: '999' };
//     event.httpMethod = 'GET';

//     const response: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);

//     expect(response.statusCode).toBe(404);
//     expect(JSON.parse(response.body).message).toBe('Sponsor with ID 999 not found.');
//   });

//   it('should return 400 if sponsor ID is missing for DELETE or PUT', async () => {
//     event.httpMethod = 'DELETE';

//     const deleteResponse: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);
//     expect(deleteResponse.statusCode).toBe(400);
//     expect(JSON.parse(deleteResponse.body).message).toBe('Missing sponsor ID in query string.');

//     event.httpMethod = 'PUT';

//     const putResponse: APIGatewayProxyResult = await sponsorController(event as APIGatewayEvent);
//     expect(putResponse.statusCode).toBe(400);
//     expect(JSON.parse(putResponse.body).message).toBe('Missing sponsor ID in query string.');
//   });
// });
