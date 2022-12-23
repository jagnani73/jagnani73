import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experiences.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experiences").insertOne(body);
};
