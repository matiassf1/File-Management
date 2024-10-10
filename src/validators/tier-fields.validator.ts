import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: 'ValidateTierFields', async: false })
class ValidateTierFieldsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const sponsor = args.object as any;

    if (!sponsor.tier) {
      return false; // Retorna false si no se especifica un tier
    }

    // Lógica para validar en función del valor de 'tier'
    switch (sponsor.tier) {
      case "Tier 1":
        return !!sponsor.image && !!sponsor.logo && !!sponsor.video;
      case "Tier 2":
        return !!sponsor.image && !!sponsor.logo && !sponsor.video;
      case "Tier 3":
        return !sponsor.image && !!sponsor.logo && !sponsor.video;
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    const sponsor = args.object as any;

    switch (sponsor.tier) {
      case "Tier 1":
        return "Tier 1 requires video, image, and logo.";
      case "Tier 2":
        return "Tier 2 allows only image and logo.";
      case "Tier 3":
        return "Tier 3 allows only logo.";
      default:
        return "Invalid tier value.";
    }
  }
}

export function validateTierFields(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "ValidateTierFields",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValidateTierFieldsConstraint,
    });
  };
}
