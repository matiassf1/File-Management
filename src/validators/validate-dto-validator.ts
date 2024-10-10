import { validate } from "class-validator";

export async function validateDto(dtoClass: any, plainObject: any) {
  const dtoInstance = Object.assign(new dtoClass(), plainObject);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    return errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
  }

  return [];
}
