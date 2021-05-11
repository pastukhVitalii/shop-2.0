export type FieldValidatorsType = (value: string) => boolean | undefined;

export const getRequiredError: FieldValidatorsType = (value) => {
  if (!value) return true;
};

export const getMaxLengthError = (value: string, maxLength: number) => {
  if (value.length > maxLength) return true;
};

export const getEmailError: FieldValidatorsType = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return true;
};

export const getNumberError: FieldValidatorsType = (value) => {
  if (isNaN(Number(value))) return true;
};
