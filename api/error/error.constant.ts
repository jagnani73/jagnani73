export const errors: Record<string, { httpStatus: number; message: string }> = {
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    message: "internal server error",
  },
  MISSING_ENV_VARIABLES: {
    httpStatus: 500,
    message: "missing env variables",
  },
  INVALID_QUERY_PARAMS: {
    httpStatus: 400,
    message: "invalid query params",
  },
};
