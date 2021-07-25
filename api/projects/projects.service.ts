import { getDb } from "../services/mongodb.service";
import { ProjectType } from "./projects.schema";

export const addProject = async (body: ProjectType): Promise<void> => {
  await (await getDb()).collection("projects").insertOne(body);
};

export const fetchProjects = async (): Promise<ProjectType[]> => {
  return await (await getDb()).collection("projects").find().toArray();
};
