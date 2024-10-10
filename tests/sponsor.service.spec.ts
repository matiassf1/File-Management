import { Sponsor } from '../src/models/sponsor.model';
import { getSponsorById, getAllSponsors, createSponsor, updateSponsor, deleteSponsor } from '../src/services/sponsor.service';
import dynamoose from 'dynamoose';
import { CreateSponsorDto } from '../src/dto/create-sponsor.dto';

// Configure Dynamoose for local DynamoDB
dynamoose.aws.ddb.local('http://dynamodb-main:8000');


describe('Sponsor Service', () => {
  let sponsorTable: any;
  beforeAll(async () => {
    try {
      sponsorTable = new dynamoose.Table('SponsorTable', [Sponsor]);
      await sponsorTable.create();
    } catch (err) {
      console.error('Error creating table:', err);
    }
  });

  afterAll(async () => {
    if (sponsorTable) {
      await sponsorTable.delete();
    }
  });

  it.only('should create a new sponsor', async () => {
    const newSponsor: CreateSponsorDto = {
      tier: 'Tier 1',
      image: 'image-url',
      video: 'video-url',
      logo: 'logo-url',
    };

    const createdSponsor = await createSponsor(newSponsor);
    console.log(createdSponsor);

    // expect(createdSponsor.id).toBeDefined();
    // expect(createdSponsor.tier).toEqual('Tier 1');
    // expect(createdSponsor.image).toEqual('image-url');
    // expect(createdSponsor.logo).toEqual('logo-url');
  });

  it('should get sponsor by ID', async () => {
    const sponsorId = `${Date.now()}`;
    const sponsorData: CreateSponsorDto = {
      tier: 'Tier 1',
      image: 'image-url',
      video: 'video-url',
      logo: 'logo-url',
    };

    await Sponsor.create({ id: sponsorId, ...sponsorData });
    const result = await getSponsorById(sponsorId);
    expect(result).toBeDefined();
    expect(result.tier).toEqual('Tier 1');
  });

  it('should get all sponsors', async () => {
    const sponsors = await getAllSponsors();
    expect(sponsors.length).toBeGreaterThan(0);
  });

  it('should update a sponsor by ID', async () => {
    const sponsorId = `${Date.now()}`;
    const sponsorData: CreateSponsorDto = {
      tier: 'Tier 2',
      image: 'image-url',
      video: undefined,
      logo: 'logo-url',
    };

    await Sponsor.create({ id: sponsorId, ...sponsorData });
    const updatedSponsorData = { image: 'new-image-url', video: 'new-video-url' };
    const updatedSponsor = await updateSponsor(sponsorId, updatedSponsorData);

    // expect(updatedSponsor.image).toEqual('new-image-url');
    // expect(updatedSponsor.video).toEqual('new-video-url');
  });

  it('should delete a sponsor by ID', async () => {
    const sponsorId = `${Date.now()}`;
    const sponsorData: CreateSponsorDto = {
      tier: 'Tier 3',
      image: undefined,
      video: undefined,
      logo: 'logo-url',
    };

    await Sponsor.create({ id: sponsorId, ...sponsorData });
    const deleteResult = await deleteSponsor(sponsorId);
    expect(deleteResult).toBeNull();

    const deletedSponsor = await getSponsorById(sponsorId);
    expect(deletedSponsor).toBeNull();
  });

  it('should handle validation error when creating a sponsor', async () => {
    const invalidSponsor: CreateSponsorDto = {
      tier: 'Invalid Tier',
      image: 'image-url',
      video: undefined,
      logo: 'logo-url',
    };

    await expect(createSponsor(invalidSponsor)).rejects.toThrow('Invalid tier value.');
  });
});
