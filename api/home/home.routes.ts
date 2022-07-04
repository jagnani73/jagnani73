import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";

import { onError, onNoMatch } from "../error/error.controller";
import { fetchExperiences } from "../experiences/experiences.service";
import { fetchHackathons } from "../hackathons/hackathons.service";
import { fetchProjects } from "../projects/projects.service";

export const homeRouter = nc<NextApiRequest, NextApiResponse>({
  onNoMatch,
  onError,
});

const getHomeData = async (
  _req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const experiences = await fetchExperiences(3, true);
    const projects = await fetchProjects(4, true);
    const hackathons = await fetchHackathons();
    res.json({
      success: true,
      hackathons,
      experiences,
      projects,
    });
  } catch (err) {
    next(err);
  }
};

homeRouter.get("/", getHomeData);
