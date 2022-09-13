import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experiences.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experiences").insertOne(body);
};

export const fetchExperiences = async (
  limit?: number,
  featured?: boolean
): Promise<ExperienceType[]> => {
  if (!!limit && !!featured)
    return (
      await (await getDb())
        .collection("experiences")
        .find<ExperienceType>({ featured }, { limit })
        .toArray()
    ).reverse();
  else
    return (
      await (await getDb())
        .collection("experiences")
        .find<ExperienceType>({}, {})
        .toArray()
    ).reverse();
};
