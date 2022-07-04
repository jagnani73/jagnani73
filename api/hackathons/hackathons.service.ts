import { getDb } from "../services/mongodb.service";
import { HackathonType } from "./hackathons.schema";

export const addHackathon = async (body: HackathonType): Promise<void> => {
  await (await getDb()).collection("hackathons").insertOne(body);
};

export const fetchHackathons = async (): Promise<HackathonType[]> => {
  return (
    await (await getDb())
      .collection("hackathons")
      .find<HackathonType>({}, {})
      .toArray()
  ).reverse();
};
