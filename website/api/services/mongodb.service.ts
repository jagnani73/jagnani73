import { MongoClient, Db } from "mongodb";

import { errors } from "../error/error.constant";

let dbClient: MongoClient;

export async function getDb(): Promise<Db> {
  const mongodbURI = process.env.MONGODB_URI;
  if (!mongodbURI) throw errors.MISSING_ENV_VARIABLES;

  if (!dbClient) {
    dbClient = await MongoClient.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✔️  Connected to Database");
  }
  return dbClient.db(process.env.MONGODB_NAME || "development");
}
