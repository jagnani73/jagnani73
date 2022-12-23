import type { LinkIconProps } from "../../utils/interfaces/projects-interface";
import { LINKS_NAMES } from "../../utils/constants/shared-constants";
import { BrowserLogo, GitHubLogo, NPMLogo } from "../../utils/logos";

const LinkIcon: React.FC<LinkIconProps> = ({ name }) => {
  switch (name) {
    case LINKS_NAMES.GITHUB:
      return <GitHubLogo />;
    case LINKS_NAMES.NPM:
      return <NPMLogo />;
    default:
      return <BrowserLogo />;
  }
};

export default LinkIcon;
