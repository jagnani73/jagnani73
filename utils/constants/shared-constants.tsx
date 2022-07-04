import {
  FooterRoutes,
  NavbarRoutes,
  SocialsRoutes,
} from "../interfaces/shared-interfaces";

export enum ROUTES {
  HOME = "/",
  ABOUT_ID = "/#about",
  EXPERIENCES = "/experiences",
  STACK_ID = "/#stack",
  PROJECTS = "/projects",
  CONTACT = "/contact",
  BLOG = "/blog",
  NOT_FOUND = "/404",
  ISR = "/500",
}

export enum STACK_NAMES {
  BOOTSTRAP = "bootstrap",
  C = "c",
  CPP = "c++",
  CSS = "css",
  EXPRESS = "express",
  FIGMA = "figma",
  GATSBY = "gatsby",
  HTML = "html",
  ILLUSTRATOR = "illustrator",
  JAVASCRIPT = "javascript",
  LINUX = "linux",
  MONGODB = "mongo db",
  NEXT = "next",
  NODE = "node",
  NUXT = "nuxt",
  PHOTOSHOP = "photoshop",
  PREACT = "preact",
  REACT = "react",
  REDUX = "redux",
  SASS = "sass",
  TAILWIND_CSS = "tailwind css",
  TYPESCRIPT = "typescript",
  VUE = "vue",
}

export enum LINKS_NAMES {
  GITHUB = "github",
  NPM = "npm",
}

export enum SOCIALS_NAMES {
  INSTAGRAM = "instagram",
  GITHUB = "github",
  MAIL = "mail",
  MEDIUM = "medium",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
}

export const NAVBAR_ROUTES: NavbarRoutes[] = [
  { href: ROUTES.HOME, name: "Home", external: false },
  { href: ROUTES.ABOUT_ID, name: "About", external: false },
  { href: ROUTES.STACK_ID, name: "Stack", external: false },
  { href: ROUTES.EXPERIENCES, name: "Experiences", external: false },
  { href: ROUTES.PROJECTS, name: "Projects", external: false },
  { href: ROUTES.CONTACT, name: "Contact", external: false },
  { href: ROUTES.BLOG, name: "Blog", external: false },
];

export const FOOTER_ROUTES: FooterRoutes[] = [
  {
    title: "Sitemap",
    routes: [
      { href: ROUTES.HOME, name: "Home", external: false },
      { href: ROUTES.EXPERIENCES, name: "Experiences", external: false },
      { href: ROUTES.PROJECTS, name: "Projects", external: false },
      { href: ROUTES.CONTACT, name: "Contact", external: false },
    ],
  },
  {
    title: "Featured Projects",
    routes: [
      {
        href: `${ROUTES.PROJECTS}/react-easy-marquee`,
        name: "react-easy-marquee",
        external: false,
      },
      {
        href: `${ROUTES.PROJECTS}/hospitatva`,
        name: "Hospitatva",
        external: false,
      },
      {
        href: `${ROUTES.PROJECTS}/shikshak`,
        name: "Shikshak",
        external: false,
      },
      {
        href: `${ROUTES.PROJECTS}/contracts`,
        name: "Contracts",
        external: false,
      },
    ],
  },
];

export const SOCIALS_ROUTES: SocialsRoutes[] = [
  {
    href: "https://github.com/jagnani73/",
    external: true,
    icon: SOCIALS_NAMES.GITHUB,
  },
  {
    href: "https://twitter.com/jagnani73/",
    external: true,
    icon: SOCIALS_NAMES.TWITTER,
  },
  {
    href: "https://www.instagram.com/jagnani73/",
    external: true,
    icon: SOCIALS_NAMES.INSTAGRAM,
  },
  {
    href: "https://www.linkedin.com/in/yashvardhan-jagnani/",
    external: true,
    icon: SOCIALS_NAMES.LINKEDIN,
  },
  {
    href: "mailto:yashjagnani73@gmail.com",
    external: true,
    icon: SOCIALS_NAMES.MAIL,
  },
];
