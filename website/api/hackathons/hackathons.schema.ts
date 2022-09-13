import * as yup from "yup";

export const HackathonSchema = yup
  .object({
    name: yup.string().trim().required(),
    organizer: yup.string().trim().required(),
    award: yup.string().trim().required(),
    location: yup.string().trim().required(),
    duration: yup.string().trim().required(),
    project: yup
      .object({
        name: yup.string().trim().required(),
        slug: yup.string().trim().required(),
      })
      .strict()
      .noUnknown(true),
  })
  .strict()
  .noUnknown(true)
  .required();

export interface HackathonType extends yup.InferType<typeof HackathonSchema> {}
