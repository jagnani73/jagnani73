import { getDb } from "../services/mongodb.service";
import { ResumeType } from "./resumes.schema";

export const addResume = async (body: ResumeType): Promise<void> => {
  await (await getDb()).collection("resumes").insertOne(body);
};

export const fetchResumes = async (): Promise<ResumeType[]> => {
  return (
    await (await getDb())
      .collection("resumes")
      .find<ResumeType>({}, {})
      .toArray()
  ).reverse();
};
