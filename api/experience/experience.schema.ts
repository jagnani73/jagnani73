import * as yup from "yup";

export const ExperienceSchema = yup.object({
  logo: yup.string().trim().required().url(),
  org: yup.string().trim().required(),
  designation: yup.string().trim().required(),
  tag: yup.string().trim().required(),
  description: yup.string().trim().required(),
  duration: yup.string().trim().required(),
});

export interface ExperienceType
  extends yup.InferType<typeof ExperienceSchema> {}
