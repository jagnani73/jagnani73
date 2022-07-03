import { getDb } from "../services/mongodb.service";
import { ProjectType } from "./projects.schema";

export const addProject = async (body: ProjectType): Promise<void> => {
  await (await getDb()).collection("projects").insertOne(body);
};

export const fetchProjects = async (
  limit?: number,
  featured?: boolean
): Promise<ProjectType[]> => {
  let projects: ProjectType[] = [];

  if (!!limit && !!featured)
    projects = await (await getDb())
      .collection("projects")
      .find<ProjectType>({ featured }, { limit })
      .toArray();
  else
    projects = await (await getDb())
      .collection("projects")
      .find<ProjectType>({}, {})
      .toArray();

  return projects.reverse();
};

export const fetchProject = async (slug: string): Promise<ProjectType> => {
  return await (await getDb())
    .collection("projects")
    .findOne<ProjectType>({ slug });
};
