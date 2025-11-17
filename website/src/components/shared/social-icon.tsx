import type { SocialIconProps } from "@/utils/types/projects.types";
import { SOCIALS_NAMES } from "@/utils/constants/shared-constants";
import { MailIcon } from "@/utils/icons";
import {
  GitHubLogo,
  InstagramLogo,
  LinkedInLogo,
  MediumLogo,
  TwitterLogo,
} from "@/utils/logos";

export const SocialIcon: React.FC<SocialIconProps> = ({ name }) => {
  switch (name) {
    case SOCIALS_NAMES.INSTAGRAM:
      return <InstagramLogo />;
    case SOCIALS_NAMES.GITHUB:
      return <GitHubLogo />;
    case SOCIALS_NAMES.MAIL:
      return <MailIcon />;
    case SOCIALS_NAMES.MEDIUM:
      return <MediumLogo />;
    case SOCIALS_NAMES.LINKEDIN:
      return <LinkedInLogo />;
    case SOCIALS_NAMES.TWITTER:
      return <TwitterLogo />;
    default:
      return <></>;
  }
};
