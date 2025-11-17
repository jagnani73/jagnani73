import { ROUTES, SOCIALS_NAMES } from "../constants/shared-constants";

export interface NavbarRoutes {
  href: ROUTES | string;
  name: string;
  external: boolean;
}

export interface FooterRoutes {
  title: string;
  routes: NavbarRoutes[];
}

export interface SocialsRoutes {
  href: string;
  icon: SOCIALS_NAMES;
  external: boolean;
}
