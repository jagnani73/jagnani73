import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addExperience } from "./experiences.service";
import { ExperienceSchema } from "./experiences.schema";

export const experiencesRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const postExperience = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await addExperience(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

if (process.env.NODE_ENV !== "production")
  experiencesRouter.post(
    validateQuery("body", ExperienceSchema),
    postExperience
  );
