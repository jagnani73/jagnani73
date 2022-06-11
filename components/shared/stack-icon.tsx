import { STACK_NAMES } from "../../utils/constants/shared-constants";
import { StackIconProps } from "../../utils/interfaces/projects-interface";
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
} from "../../utils/logos";

const StackIcon: React.FC<StackIconProps> = ({ name }) => {
  switch (name) {
    case STACK_NAMES.BOOTSTRAP:
      return <BootstrapLogo />;
    case STACK_NAMES.C:
      return <CLogo />;
    case STACK_NAMES.CPP:
      return <CPPLogo />;
    case STACK_NAMES.CSS:
      return <CSSLogo />;
    case STACK_NAMES.EXPRESS:
      return <ExpressLogo />;
    case STACK_NAMES.FIGMA:
      return <FigmaLogo />;
    case STACK_NAMES.GATSBY:
      return <GatsbyLogo />;
    case STACK_NAMES.HTML:
      return <HTMLLogo />;
    case STACK_NAMES.ILLUSTRATOR:
      return <IllustratorLogo />;
    case STACK_NAMES.JAVASCRIPT:
      return <JavascriptLogo />;
    case STACK_NAMES.LINUX:
      return <LinuxLogo />;
    case STACK_NAMES.MONGODB:
      return <MongoLogo />;
    case STACK_NAMES.NEXT:
      return <NextLogo />;
    case STACK_NAMES.NODE:
      return <NodeLogo />;
    case STACK_NAMES.NUXT:
      return <NuxtLogo />;
    case STACK_NAMES.PHOTOSHOP:
      return <PhotoshopLogo />;
    case STACK_NAMES.PREACT:
      return <PreactLogo />;
    case STACK_NAMES.REACT:
      return <ReactLogo />;
    case STACK_NAMES.REDUX:
      return <ReduxLogo />;
    case STACK_NAMES.SASS:
      return <SassLogo />;
    case STACK_NAMES.TAILWIND_CSS:
      return <TailwindLogo />;
    case STACK_NAMES.TYPESCRIPT:
      return <TypescriptLogo />;
    case STACK_NAMES.VUE:
      return <VueLogo />;
    default:
      return <></>;
  }
};

export default StackIcon;
