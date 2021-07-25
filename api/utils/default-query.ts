import * as yup from "yup";

export const routesQuery = yup.object({ routes: yup.array().of(yup.string()) });
