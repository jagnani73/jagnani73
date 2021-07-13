import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addExperience, fetchExperience } from "./experience.service";
import { ExperienceSchema } from "./experience.schema";

export const experienceRouter = nc<NextApiRequest, NextApiResponse>({
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

const getExperience = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const data = await fetchExperience();
    res.json({
      success: true,
      experience: data,
    });
  } catch (err) {
    next(err);
  }
};

process.env.NODE_ENV !== "production" &&
  experienceRouter.post(
    validateQuery("body", ExperienceSchema),
    postExperience
  );
experienceRouter.get(getExperience);
