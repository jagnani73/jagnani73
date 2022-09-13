import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addResume } from "./resumes.service";
import { ResumeSchema } from "./resumes.schema";

export const resumesRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const postResume = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await addResume(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

if (process.env.NODE_ENV !== "production")
  resumesRouter.post(validateQuery("body", ResumeSchema), postResume);
