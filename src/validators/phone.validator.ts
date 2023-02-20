import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  buildMessage,
  isPhoneNumber,
} from "class-validator";

export function IsPhoneNumberForRegion(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
      registerDecorator({
        name: "isPhoneNumberForRegion",
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
            validate(value: any, args: ValidationArguments) {
              const [countryCodeField] = args.constraints;
              const countryCode = (args.object as any)[countryCodeField];
              return isPhoneNumber(value, countryCode);
            },
            defaultMessage: buildMessage(
            (eachPrefix) =>
              `${eachPrefix} $property must be a valid phone number in the specified region`,
            validationOptions
            ),
        },
    });
  };
}
