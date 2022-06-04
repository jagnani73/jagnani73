import axios, { AxiosInstance } from "axios";

import { ProjectProps, ExperienceProps } from "../interfaces/shared-interfaces";
import { Environment } from "../environment";
import { ArticleProps } from "../interfaces/blog-interfaces";

const instance: AxiosInstance = axios.create({
  baseURL: `${
    Environment.isDevelopment() ? process.env.NEXT_APP_API_BASE_URL : ""
  }/api/v1`,
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

export const getBlogs = async (): Promise<ArticleProps[] | false> => {
  try {
    return await (
      await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jagnani73"
      )
    ).data.items;
  } catch (error) {
    console.log(error);
    return false;
  }
};
