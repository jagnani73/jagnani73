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

export const NAVBAR_ROUTES: { href: ROUTES; name: string }[] = [
  { href: ROUTES.HOME, name: "home" },
  { href: ROUTES.ABOUT_ID, name: "about" },
  { href: ROUTES.STACK_ID, name: "stack" },
  { href: ROUTES.EXPERIENCES, name: "experiences" },
  { href: ROUTES.PROJECTS, name: "projects" },
  { href: ROUTES.CONTACT, name: "contact" },
  { href: ROUTES.BLOG, name: "blog" },
];

export enum STACK_NAMES {
  BOOTSTRAP = "bootstrap",
  C = "c",
  CPP = "c",
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
