import { getDb } from "../services/mongodb.service";
import { CertificationType } from "./certifications.schema";

export const addCertification = async (
  body: CertificationType
): Promise<void> => {
  await (await getDb()).collection("certifications").insertOne(body);
};

export const fetchCertifications = async (): Promise<CertificationType[]> => {
  return (
    await (await getDb())
      .collection("certifications")
      .find<CertificationType>({}, {})
      .toArray()
  ).reverse();
};
