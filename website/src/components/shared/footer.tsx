import Link from "next/link";

import { SocialIcon } from ".";
import { SOCIALS_NAMES } from "@/utils/constants/shared-constants";
import { SocialsRoutes } from "@/utils/types/shared.types";

export const Footer: React.FC = () => {
  const SOCIALS_ROUTES: SocialsRoutes[] = [
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

  return (
    <footer className=" mt-8">
      <div className="w-full lg:w-10/12 mx-auto">
        <div className="grid grid-cols-3 justify-center items-center">
          <object
            type="image/svg+xml"
            data="/loader.svg"
            className="w-32 mx-auto"
          />

          <h3 className="font-bold whitespace-nowrap text-center">
            Yashvardhan Jagnani
          </h3>

          <div className="flex gap-x-8 justify-center">
            {SOCIALS_ROUTES.map(({ href, external, icon }) => (
              <Link
                key={href}
                href={href}
                className="uppercase text-sm w-7"
                rel="noopener noreferrer"
                target={external ? "_blank" : ""}
              >
                <SocialIcon name={icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
