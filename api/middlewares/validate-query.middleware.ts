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
    let data: any;
    switch (location) {
      case "query":
        data = req.query;
        break;
      case "body":
        data = req.body;
        break;
      case "headers":
        data = req.headers;
        break;
    }
    try {
      await schema.validate(data, { abortEarly: false });
      next();
    } catch (err) {
      next({ httpStatus: 400, message: err.errors.join(". ") });
    }
  };
};
