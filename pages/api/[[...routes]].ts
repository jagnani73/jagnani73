import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { onError, onNoMatch } from "../../api/error/error.controller";
import { experienceRouter } from "../../api/experience/experience.routes";

const rootRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const indexRouter = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
});

rootRouter.use("/api/v1", indexRouter);

indexRouter.use("/experience", experienceRouter);

export default rootRouter;
