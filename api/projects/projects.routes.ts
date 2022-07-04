import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { errors } from "../error/error.constant";
import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addProject, fetchProjects, fetchProject } from "./projects.service";
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

const getProjects = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const projects = await fetchProjects();
    res.json({
      success: true,
      projects,
    });
  } catch (err) {
    next(err);
  }
};

const getProject = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const { slug } = req["params"];
    const data = await fetchProject(slug);
    if (data) {
      res.json({
        success: true,
        project: data,
      });
    } else {
      throw errors.PROJECT_NOT_FOUND;
    }
  } catch (err) {
    next(err);
  }
};

projectsRouter.get("/:slug", getProject);
projectsRouter.get("/", getProjects);

if (process.env.NODE_ENV !== "production")
  projectsRouter.post("", validateQuery("body", ProjectSchema), postProject);
