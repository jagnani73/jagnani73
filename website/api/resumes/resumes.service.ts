import { getDb } from "../services/mongodb.service";
import { ResumeType } from "./resumes.schema";

export const addResume = async (body: ResumeType): Promise<void> => {
  await (await getDb()).collection("resumes").insertOne(body);
};
