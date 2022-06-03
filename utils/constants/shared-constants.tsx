export const navbarRoutes: { href: string; name: string; scroll?: boolean }[] =
  [
    { href: "/", name: "home" },
    { href: "/", name: "about", scroll: true },
    { href: "/", name: "experiences" },
    { href: "/", name: "stack" },
    { href: "/", name: "projects" },
    { href: "/", name: "contact" },
    { href: "/", name: "blog" },
  ];

export enum Environments {
  development = "development",
  production = "production",
}

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
