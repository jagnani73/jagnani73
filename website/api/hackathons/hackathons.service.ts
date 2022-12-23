import { getDb } from "../services/mongodb.service";
import { HackathonType } from "./hackathons.schema";

export const addHackathon = async (body: HackathonType): Promise<void> => {
  await (await getDb()).collection("hackathons").insertOne(body);
};
