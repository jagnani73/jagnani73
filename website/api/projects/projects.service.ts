import { getDb } from "../services/mongodb.service";
import { ProjectType } from "./projects.schema";

export const addProject = async (body: ProjectType): Promise<void> => {
  await (await getDb()).collection("projects").insertOne(body);
};
