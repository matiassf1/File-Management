// src/services/sponsor.service.ts
import { Sponsor } from "../models/sponsor.model";
import { CreateSponsorDto } from "../dto/create-sponsor.dto";
import { validateDto } from "../validators/validate-dto-validator";

export const getSponsorById = async (id: string) => {
  return await Sponsor.get(id);
};

export const getAllSponsors = async () => {
  return await Sponsor.scan().exec();
};

export const createSponsor = async (newSponsorData: CreateSponsorDto) => {
  const validationErrors = await validateDto(CreateSponsorDto, newSponsorData);
  if (validationErrors.length > 0) {
    throw new Error(JSON.stringify(validationErrors));
  }
  const newSponsor = new Sponsor({
    id: `${Date.now()}`,
    ...newSponsorData,
  });
  return await newSponsor.save();
};

export const updateSponsor = async (id: string, updateData: any) => {
  return await Sponsor.update({ id }, updateData);
};

export const deleteSponsor = async (id: string) => {
  return await Sponsor.delete(id);
};
