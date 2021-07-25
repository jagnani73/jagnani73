import axios, { AxiosInstance } from "axios";

import { ProjectProps, ExperienceProps } from "../utils/interfaces";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_APP_API_BASE_URL}/api/v1`,
});

export const getProjects = async (): Promise<ProjectProps[] | false> => {
  try {
    return await (
      await instance.get("/projects")
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

export const getExperiences = async (): Promise<ExperienceProps[] | false> => {
  try {
    return await (
      await instance.get("/experiences")
    ).data.experiences;
  } catch (error) {
    console.log(error);
    return false;
  }
};
