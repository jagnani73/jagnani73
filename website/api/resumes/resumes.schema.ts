import * as yup from "yup";

export const ResumeSchema = yup
  .object({
    resume: yup.string().trim().url().required(),
    preview: yup.string().trim().url().required(),
    date: yup.string().trim().required(),
  })
  .strict()
  .noUnknown(true)
  .required();

export interface ResumeType extends yup.InferType<typeof ResumeSchema> {}
