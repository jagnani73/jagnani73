import * as Logos from "./logos";

export const tags: string[] = ["web developer", "something", "else"];

export const stack: {
  name: string;
  logo: JSX.Element;
}[] = [
  { name: "bootstrap", logo: <Logos.BootstrapLogo /> },
  { name: "c", logo: <Logos.CLogo /> },
  { name: "c++", logo: <Logos.CPPLogo /> },
  { name: "css", logo: <Logos.CSSLogo /> },
  { name: "express", logo: <Logos.ExpressLogo /> },
  { name: "figma", logo: <Logos.FigmaLogo /> },
  { name: "gatsby", logo: <Logos.GatsbyLogo /> },
  { name: "html", logo: <Logos.HTMLLogo /> },
  { name: "illustrator", logo: <Logos.IllustratorLogo /> },
  { name: "javascript", logo: <Logos.JavascriptLogo /> },
  { name: "linux", logo: <Logos.LinuxLogo /> },
  { name: "mongo", logo: <Logos.MongoLogo /> },
  { name: "next", logo: <Logos.NextLogo /> },
  { name: "node", logo: <Logos.NodeLogo /> },
  { name: "nuxt", logo: <Logos.NuxtLogo /> },
  { name: "photoshop", logo: <Logos.PhotoshopLogo /> },
  { name: "preact", logo: <Logos.PreactLogo /> },
  { name: "react", logo: <Logos.ReactLogo /> },
  { name: "redux", logo: <Logos.ReduxLogo /> },
  { name: "sass", logo: <Logos.SassLogo /> },
  // { name: "tailwind", logo: <Logos.TailwindLogo /> },
  { name: "typescript", logo: <Logos.TypescriptLogo /> },
  { name: "vue", logo: <Logos.VueLogo /> },
];

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
