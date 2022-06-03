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
import { STACK_NAMES } from "./shared-constants";

export const tags: string[] = ["web developer", "something", "else"];

export const STACK: {
  name: STACK_NAMES;
  logo: JSX.Element;
}[] = [
  { name: STACK_NAMES.BOOTSTRAP, logo: <BootstrapLogo /> },
  { name: STACK_NAMES.C, logo: <CLogo /> },
  { name: STACK_NAMES.CPP, logo: <CPPLogo /> },
  { name: STACK_NAMES.CSS, logo: <CSSLogo /> },
  { name: STACK_NAMES.EXPRESS, logo: <ExpressLogo /> },
  { name: STACK_NAMES.FIGMA, logo: <FigmaLogo /> },
  { name: STACK_NAMES.GATSBY, logo: <GatsbyLogo /> },
  { name: STACK_NAMES.HTML, logo: <HTMLLogo /> },
  { name: STACK_NAMES.HTML, logo: <IllustratorLogo /> },
  { name: STACK_NAMES.JAVASCRIPT, logo: <JavascriptLogo /> },
  { name: STACK_NAMES.LINUX, logo: <LinuxLogo /> },
  { name: STACK_NAMES.MONGODB, logo: <MongoLogo /> },
  { name: STACK_NAMES.NEXT, logo: <NextLogo /> },
  { name: STACK_NAMES.NODE, logo: <NodeLogo /> },
  { name: STACK_NAMES.NUXT, logo: <NuxtLogo /> },
  { name: STACK_NAMES.PHOTOSHOP, logo: <PhotoshopLogo /> },
  { name: STACK_NAMES.PREACT, logo: <PreactLogo /> },
  { name: STACK_NAMES.REACT, logo: <ReactLogo /> },
  { name: STACK_NAMES.REDUX, logo: <ReduxLogo /> },
  { name: STACK_NAMES.SASS, logo: <SassLogo /> },
  { name: STACK_NAMES.TAILWIND_CSS, logo: <TailwindLogo /> },
  { name: STACK_NAMES.TYPESCRIPT, logo: <TypescriptLogo /> },
  { name: STACK_NAMES.VUE, logo: <VueLogo /> },
];
