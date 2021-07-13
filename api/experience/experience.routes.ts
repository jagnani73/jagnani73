import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { addExperience } from "./experience.service";

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
    console.log(req.body);
    await addExperience(req.body, res, next);
  } catch (err) {
    next(err);
  }
};

experienceRouter.post(postExperience);
