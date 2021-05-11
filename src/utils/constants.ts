export const SECONDARY = 'secondary';
export const PRIMARY = 'primary';

export const LOADING = 'loading';

export const BTN_TITLE = {
  IN_CART: 'In cart',
  BTN_BUY: 'Buy',
};

export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'Field is required',
  INVALID_EMAIL: 'Invalid email',
  PHONE_NUMBER: 'Must be a number',
  MAX_LENGTH(maxLength: number) {
    return `Max length is ${maxLength} symbols`;
  },
};

export const PRODUCT_COUNT = {
  MIN: 1,
  MAX: 10,
};

export const MAX_FIELD_LENGTH = 15;