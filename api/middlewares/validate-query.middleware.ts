import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

type RequestLocations = "query" | "body" | "headers";

/**
 * Generic Request Validator
 * @param {RequestLocations} location The parameter of the req object to be validated.
 * @param {yup.ObjectSchema} schema The schema against which validation is to be done.
 */

export const validateQuery = (
  location: RequestLocations,
  schema: yup.ObjectSchema<any>
) => {
  return async (
    req: NextApiRequest,
    _res: NextApiResponse,
    next: NextHandler
  ) => {
    try {
      await schema.validate(req[location], { abortEarly: false });
      next();
    } catch (err) {
      next({ httpStatus: 400, message: err.errors.join(". ") });
    }
  };
};
