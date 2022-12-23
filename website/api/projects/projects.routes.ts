import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addProject } from "./projects.service";
import { ProjectSchema } from "./projects.schema";

export const projectsRouter = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
  attachParams: true,
});

const postProject = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await addProject(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

if (process.env.NODE_ENV !== "production")
  projectsRouter.post("", validateQuery("body", ProjectSchema), postProject);
