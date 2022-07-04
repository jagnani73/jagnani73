import axios, { AxiosInstance } from "axios";

import { ProjectType, ExperienceType } from "../interfaces/shared-interfaces";
import { ArticleProps } from "../interfaces/blog-interfaces";
import { HomePageProps } from "../interfaces/home-interfaces";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_APP_API_BASE_URL}/api/v1`,
});

export const getProjects = async (): Promise<ProjectType[]> => {
  return await (
    await instance.get("/projects")
  ).data.projects;
};

export const getProject = async (slug: string): Promise<ProjectType> => {
  return await (
    await instance.get(`/projects/${slug}`)
  ).data.project;
};

export const getExperiences = async (): Promise<ExperienceType[]> => {
  return await (
    await instance.get("/experiences")
  ).data.experiences;
};

export const getBlogs = async (): Promise<ArticleProps[]> => {
  return await (
    await axios.get(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jagnani73"
    )
  ).data.items;
};

export const getHome = async (): Promise<HomePageProps> => {
  return await (
    await instance.get("/home")
  ).data;
};
