import * as yup from "yup";

export const ExperienceSchema = yup
  .object({
    logo: yup.string().trim().required().url(),
    org: yup.string().trim().required(),
    url: yup.string().trim().url(),
    designation: yup.string().trim().required(),
    tag: yup.string().trim().required(),
    description: yup.string().trim().required(),
    duration: yup.string().trim().required(),
    slug: yup.string().trim().required(),
    featured: yup.boolean().required().default(false),
  })
  .strict()
  .noUnknown(true)
  .required();

export interface ExperienceType
  extends yup.InferType<typeof ExperienceSchema> {}
