export type FieldValidatorsType = (value: string) => string | undefined;

export const required: FieldValidatorsType = (value) => {
  if (!value) {
    return 'Field is required';
  }
};

export const maxLengthCreator = (value: string, maxLength: number) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
};

export const email: FieldValidatorsType = (value) => {
  if (!value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email';
  }
};

export const number: FieldValidatorsType = (value) => {
  return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
};