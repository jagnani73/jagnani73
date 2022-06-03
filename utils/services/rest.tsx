import axios, { AxiosInstance } from "axios";

import { ProjectProps, ExperienceProps } from "../interfaces/shared-interfaces";

const instance: AxiosInstance = axios.create({
});

export const getProjects = async (
  limit?: number,
  featured?: boolean
): Promise<ProjectProps[] | false> => {
  try {
    const query = `?limit=${limit}&featured=${featured}`;
    return await (
      await instance.get(
        `/projects${limit && featured !== (null || undefined) ? query : ""}`
      )
    ).data.projects;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProjectsSlugs = async (): Promise<string[] | false> => {
  try {
    return await (
      await instance.get("/projects/slugs")
    ).data.slugs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProject = async (
  slug: string
): Promise<ProjectProps | false> => {
  try {
    return await (
      await instance.get(`/projects/${slug}`)
    ).data.project;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getExperiences = async (
  limit?: number,
  featured?: boolean
): Promise<ExperienceProps[] | false> => {
  try {
    const query = `?limit=${limit}&featured=${featured}`;
    return await (
      await instance.get(
        `/experiences${limit && featured !== (null || undefined) ? query : ""}`
      )
    ).data.experiences;
  } catch (error) {
    console.log(error);
    return false;
  }
};
