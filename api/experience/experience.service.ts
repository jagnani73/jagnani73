import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experience.schema";

export const addExperience = async (
  body: ExperienceType,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await (await getDb()).collection("experience").insertOne(body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
