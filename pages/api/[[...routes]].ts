import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { onError, onNoMatch } from "../../api/error/error.controller";
import { homeRouter } from "../../api/home/home.routes";
import { experiencesRouter } from "../../api/experiences/experiences.routes";
import { projectsRouter } from "../../api/projects/projects.routes";
import { hackathonsRouter } from "../../api/hackathons/hackathons.routes";
import { certificationsRouter } from "../../api/certifications/certifications.routes";

const rootRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const indexRouter = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
});

rootRouter.use("/api/v1", indexRouter);

indexRouter.use("/home", homeRouter);
indexRouter.use("/hackathons", hackathonsRouter);
indexRouter.use("/certifications", certificationsRouter);
indexRouter.use("/experiences", experiencesRouter);
indexRouter.use("/projects", projectsRouter);

export default rootRouter;
