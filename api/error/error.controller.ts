import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler, ErrorHandler } from "next-connect";

import { errors } from "./error.constant";

interface ApiError extends Error {
  message: string;
  httpStatus: number;
}

export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
};

export const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err: ApiError,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  if (err.httpStatus) {
    console.error(err);
    res.status(err.httpStatus).json({
      success: false,
      message: err.message,
    });
  } else {
    console.log(err);
    throw errors.INTERNAL_SERVER_ERROR;
  }
};
