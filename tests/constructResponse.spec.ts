import { constructResponse } from '../src/utils/constructResponse';

describe('constructResponse', () => {
  it('should return a valid response object', () => {
    const result = constructResponse(200, { message: 'Success' });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle errors correctly', () => {
    const result = constructResponse(500, { error: 'Server error' });
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
