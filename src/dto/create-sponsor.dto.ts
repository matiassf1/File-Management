import { IsString, IsOptional } from "class-validator";
import { validateTierFields } from "../validators/tier-fields.validator";

export class CreateSponsorDto {
  @IsString()
  @validateTierFields()
  tier?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
