import * as yup from "yup";

import { routesQuery } from "../utils/default-query";

export const ProjectSchema = yup
  .object({
    preview: yup.string().trim().required().url(),
    name: yup.string().trim().required(),
    description: yup.string().trim().required(),
    tag: yup.string().trim().required(),
    stack: yup.array().of(yup.string().trim()).required(),
    links: yup.array().of(yup.string().trim().url()).required(),
    slug: yup.string().trim().required(),
    featured: yup.boolean().required().default(false),
  })
  .strict()
  .noUnknown(true)
  .required();

export interface ProjectType extends yup.InferType<typeof ProjectSchema> {}

export const ProjectsQuery = routesQuery
  .shape({
    limit: yup.string(),
    featured: yup.string(),
  })
  .strict()
  .noUnknown(true)
  .required();
