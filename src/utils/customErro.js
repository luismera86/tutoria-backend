const customError = ({ name = "Error", cause, message, code = 1 }) => {
  const error = new Error(message);
  error.name = name;
  error.cause = cause;
  error.code = code;

  throw error;
};

// Diccionario de errores

const EErrors = {
  ROUTING_ERROR: 1,
  PRODUCT_NOT_FOUND: 2,
  INVALID_TYPE: 3,
  INVALID_FORMAT: 4,
  CART_NOT_FOUND: 5,
  USER_NOT_FOUND: 6,
  INVALID_CREDENTIALS: 7,
  INVALID_TOKEN: 8,
  INVALID_PERMISSIONS: 9,
  INVALID_OPERATION: 10,
  INVALID_DATA: 11,
  INVALID_ID: 12,
  INVALID_PASSWORD: 13,
  INVALID_EMAIL: 14,
};

export { customError, EErrors };
