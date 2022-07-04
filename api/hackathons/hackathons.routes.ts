import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addHackathon } from "./hackathons.service";
import { HackathonSchema } from "./hackathons.schema";

export const hackathonsRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const postHackathon = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await addHackathon(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

if (process.env.NODE_ENV !== "production")
  hackathonsRouter.post(validateQuery("body", HackathonSchema), postHackathon);
