import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addCertification } from "./certifications.service";
import { CertificationSchema } from "./certifications.schema";

export const certificationsRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const postCertificate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await addCertification(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

if (process.env.NODE_ENV !== "production")
  certificationsRouter.post(
    validateQuery("body", CertificationSchema),
    postCertificate
  );
