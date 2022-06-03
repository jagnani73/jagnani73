import {
  BootstrapLogo,
  CLogo,
  CPPLogo,
  CSSLogo,
  ExpressLogo,
  FigmaLogo,
  GatsbyLogo,
  HTMLLogo,
  IllustratorLogo,
  JavascriptLogo,
  LinuxLogo,
  MongoLogo,
  NextLogo,
  NodeLogo,
  NuxtLogo,
  PhotoshopLogo,
  PreactLogo,
  ReactLogo,
  ReduxLogo,
  SassLogo,
  TailwindLogo,
  TypescriptLogo,
  VueLogo,
} from "../logos";
import { STACK_ICONS } from "./shared-constants";

export const tags: string[] = ["web developer", "something", "else"];

export const STACK: {
  name: STACK_ICONS;
  logo: JSX.Element;
}[] = [
  { name: STACK_ICONS.BOOTSTRAP, logo: <BootstrapLogo /> },
  { name: STACK_ICONS.C, logo: <CLogo /> },
  { name: STACK_ICONS.CPP, logo: <CPPLogo /> },
  { name: STACK_ICONS.CSS, logo: <CSSLogo /> },
  { name: STACK_ICONS.EXPRESS, logo: <ExpressLogo /> },
  { name: STACK_ICONS.FIGMA, logo: <FigmaLogo /> },
  { name: STACK_ICONS.GATSBY, logo: <GatsbyLogo /> },
  { name: STACK_ICONS.HTML, logo: <HTMLLogo /> },
  { name: STACK_ICONS.HTML, logo: <IllustratorLogo /> },
  { name: STACK_ICONS.JAVASCRIPT, logo: <JavascriptLogo /> },
  { name: STACK_ICONS.LINUX, logo: <LinuxLogo /> },
  { name: STACK_ICONS.MONGODB, logo: <MongoLogo /> },
  { name: STACK_ICONS.NEXT, logo: <NextLogo /> },
  { name: STACK_ICONS.NODE, logo: <NodeLogo /> },
  { name: STACK_ICONS.NUXT, logo: <NuxtLogo /> },
  { name: STACK_ICONS.PHOTOSHOP, logo: <PhotoshopLogo /> },
  { name: STACK_ICONS.PREACT, logo: <PreactLogo /> },
  { name: STACK_ICONS.REACT, logo: <ReactLogo /> },
  { name: STACK_ICONS.REDUX, logo: <ReduxLogo /> },
  { name: STACK_ICONS.SASS, logo: <SassLogo /> },
  { name: STACK_ICONS.TAILWIND_CSS, logo: <TailwindLogo /> },
  { name: STACK_ICONS.TYPESCRIPT, logo: <TypescriptLogo /> },
  { name: STACK_ICONS.VUE, logo: <VueLogo /> },
];
