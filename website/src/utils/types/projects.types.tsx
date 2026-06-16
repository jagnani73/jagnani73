import { LINKS_NAMES, STACK_NAMES } from "../constants/shared-constants";

export interface ProjectType {
  slug: string;
  preview: string;
  images?: string[];
  name: string;
  description: string;
  tag: string;
  stack: STACK_NAMES[];
  links: {
    name: LINKS_NAMES;
    url: string;
  }[];
}
