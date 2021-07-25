import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experiences.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experiences").insertOne(body);
};

export const fetchExperiences = async (
  limit?: number,
  featured?: boolean
): Promise<ExperienceType[]> => {
  if (limit && featured !== null)
    return await (await getDb())
      .collection("experiences")
      .find({ featured }, { limit })
      .toArray();
  else return await (await getDb()).collection("experiences").find().toArray();
};
