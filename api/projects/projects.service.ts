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
      .find<ProjectType>({ featured }, { limit })
      .toArray();
  else
    return await (await getDb())
      .collection("projects")
      .find<ProjectType>({}, {})
      .toArray();
};

export const fetchProject = async (slug: string): Promise<ProjectType> => {
  return await (await getDb())
    .collection("projects")
    .findOne<ProjectType>({ slug });
};

export const fetchProjectsSlugs = async (): Promise<string[]> => {
  const data = await (
    await getDb()
  )
    .collection("projects")
    .find<ProjectType>({}, { projection: { _id: 0, slug: 1 } })
    .toArray();

  let slugs: string[] = [];
  data.forEach((item) => slugs.push(item.slug));
  return slugs;
};
