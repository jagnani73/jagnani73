import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { errors } from "../error/error.constant";
import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addExperience, fetchExperiences } from "./experiences.service";
import { ExperienceSchema, ExperiencesQuery } from "./experiences.schema";

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

const getExperiences = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const { limit, featured } = req.query;

    if (limit && featured) {
      const parsedFeatured: boolean | null =
        featured === "true" ? true : featured === "false" ? false : null;

      if (isNaN(+limit) || parsedFeatured === null || +limit < 1) {
        throw errors.INVALID_QUERY_PARAMS;
      }

      const data = await fetchExperiences(+limit, parsedFeatured);
      res.json({
        success: true,
        experiences: data,
      });
    } else if (!limit && !featured) {
      const data = await fetchExperiences();
      res.json({
        success: true,
        experiences: data,
      });
    } else {
      throw errors.INVALID_QUERY_PARAMS;
    }
  } catch (err) {
    next(err);
  }
};

experiencesRouter.get(
  "",
  validateQuery("query", ExperiencesQuery),
  getExperiences
);

if (process.env.NODE_ENV !== "production")
  experiencesRouter.post(
    validateQuery("body", ExperienceSchema),
    postExperience
  );
