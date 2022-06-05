import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { errors } from "../error/error.constant";
import { onError, onNoMatch } from "../error/error.controller";
import { validateQuery } from "../middlewares/validate-query.middleware";
import { addProject, fetchProjects, fetchProject } from "./projects.service";
import { ProjectSchema, ProjectsQuery } from "./projects.schema";

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

      const data = await fetchProjects(+limit, parsedFeatured);
      res.json({
        success: true,
        projects: data,
      });
    } else if (!limit && !featured) {
      const data = await fetchProjects();
      res.json({
        success: true,
        projects: data,
      });
    } else {
      throw errors.INVALID_QUERY_PARAMS;
    }
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
projectsRouter.get("", validateQuery("query", ProjectsQuery), getProjects);

if (process.env.NODE_ENV !== "production")
  projectsRouter.post("", validateQuery("body", ProjectSchema), postProject);
