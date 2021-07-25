import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addProject, fetchProjects } from "./projects.service";
import { ProjectSchema } from "./projects.schema";

export const projectsRouter = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
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

const getProjects = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const data = await fetchProjects();
    res.json({
      success: true,
      experience: data,
    });
  } catch (err) {
    next(err);
  }
};

process.env.NODE_ENV !== "production" &&
  projectsRouter.post(validateQuery("body", ProjectSchema), postProject);
projectsRouter.get(getProjects);
