import { validate } from 'class-validator';
import { CreateSponsorDto } from '../src/dto/create-sponsor.dto';

describe('Tier Fields Validator', () => {
  it('should validate tier field successfully', async () => {
    const dto = new CreateSponsorDto();
    dto.tier = 'Tier 3';
    dto.logo = 'random value'

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should throw validation error for invalid tier', async () => {
    const dto = new CreateSponsorDto();
    dto.tier = 'invalid-tier';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
