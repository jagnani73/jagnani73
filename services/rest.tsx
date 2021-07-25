import axios, { AxiosInstance } from "axios";

import { ProjectProps } from "../utils/interfaces";

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
