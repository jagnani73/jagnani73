import * as yup from "yup";

export const CertificationSchema = yup
  .object({
    name: yup.string().trim().required(),
    organization: yup.string().trim().required(),
    validity: yup.string().trim().required(),
  })
  .strict()
  .noUnknown(true)
  .required();

export interface CertificationType
  extends yup.InferType<typeof CertificationSchema> {}
