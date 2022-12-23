import { getDb } from "../services/mongodb.service";
import { CertificationType } from "./certifications.schema";

export const addCertification = async (
  body: CertificationType
): Promise<void> => {
  await (await getDb()).collection("certifications").insertOne(body);
};
