import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experience.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experience").insertOne(body);
};

export const fetchExperience = async (): Promise<ExperienceType[]> => {
  return await (await getDb()).collection("experience").find().toArray();
};
