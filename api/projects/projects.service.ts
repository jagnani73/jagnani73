import { getDb } from "../services/mongodb.service";
import { ProjectType } from "./projects.schema";

export const addProject = async (body: ProjectType): Promise<void> => {
  await (await getDb()).collection("projects").insertOne(body);
};

export const fetchProjects = async (
  limit?: number,
  featured?: boolean
): Promise<ProjectType[]> => {
  if (limit && featured !== null)
    return await (await getDb())
      .collection("projects")
      .find({ featured }, { limit })
      .toArray();
  else return await (await getDb()).collection("projects").find().toArray();
};
