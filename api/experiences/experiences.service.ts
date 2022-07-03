import { getDb } from "../services/mongodb.service";
import { ExperienceType } from "./experiences.schema";

export const addExperience = async (body: ExperienceType): Promise<void> => {
  await (await getDb()).collection("experiences").insertOne(body);
};

export const fetchExperiences = async (
  limit?: number,
  featured?: boolean
): Promise<ExperienceType[]> => {
  let experiences: ExperienceType[] = [];

  if (!!limit && !!featured)
    experiences = await (await getDb())
      .collection("experiences")
      .find<ExperienceType>({ featured }, { limit })
      .toArray();
  else
    experiences = await (await getDb())
      .collection("experiences")
      .find<ExperienceType>({}, {})
      .toArray();

  return experiences.reverse();
};
