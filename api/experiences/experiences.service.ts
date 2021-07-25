import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experiences.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experience").insertOne(body);
};

export const fetchExperiences = async (): Promise<ExperienceType[]> => {
  return await (await getDb()).collection("experience").find().toArray();
};
