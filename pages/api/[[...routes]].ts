import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { onError, onNoMatch } from "../../api/error/error.controller";
import { experiencesRouter } from "../../api/experiences/experiences.routes";
import { projectsRouter } from "../../api/projects/projects.routes";

const rootRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const indexRouter = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
});

rootRouter.use("/api/v1", indexRouter);

indexRouter.use("/experiences", experiencesRouter);
indexRouter.use("/projects", projectsRouter);

export default rootRouter;
