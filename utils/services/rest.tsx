import axios, { AxiosInstance } from "axios";

import { ProjectType, ExperienceType } from "../interfaces/shared-interfaces";
import { ArticleProps } from "../interfaces/blog-interfaces";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_APP_API_BASE_URL}/api/v1`,
});

export const getProjects = async (
  limit?: number,
  featured?: boolean
): Promise<ProjectType[]> => {
  const query = `?limit=${limit}&featured=${featured}`;
  return await (
    await instance.get(`/projects${limit && featured ? query : ""}`)
  ).data.projects;
};

export const getProject = async (slug: string): Promise<ProjectType> => {
  return await (
    await instance.get(`/projects/${slug}`)
  ).data.project;
};

export const getExperiences = async (
  limit?: number,
  featured?: boolean
): Promise<ExperienceType[]> => {
  const query = `?limit=${limit}&featured=${featured}`;
  return await (
    await instance.get(`/experiences${limit && featured ? query : ""}`)
  ).data.experiences;
};

export const getBlogs = async (): Promise<ArticleProps[]> => {
  return await (
    await axios.get(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jagnani73"
    )
  ).data.items;
};
