import Link from "next/link";

import {
  FOOTER_ROUTES,
  ROUTES,
  SOCIALS_NAMES,
  SOCIALS_ROUTES,
} from "../../utils/constants/shared-constants";
import SocialIcon from "./social-icon";

const Footer: React.FC = () => {
  return (
    <footer className="section-container mb-16">
      <div className="flex p-12">
        {FOOTER_ROUTES.map(({ title, routes }) => (
          <div className="flex flex-col gap-y-2 w-full">
            <h5 className="font-semibold mb-4">{title}</h5>
            {routes.map(({ name, href, external }) => (
              <Link key={name + href} href={href}>
                <a
                  className="uppercase text-sm"
                  rel="noopener noreferrer"
                  target={external ? "_blank" : ""}
                >
                  {name}
                </a>
              </Link>
            ))}
          </div>
        ))}

        <div className="w-full flex flex-col">
          <div className="flex items-center justify-end">
            <h3>Yashvardhan Jagnani</h3>
            <figure className="w-16 h-16 rounded-full ml-8 bg-white"></figure>
          </div>

          <div className="flex gap-4 mt-auto pt-2">
            {SOCIALS_ROUTES.map(({ href, external, icon }) => (
              <Link key={href} href={href}>
                <a
                  className="uppercase text-sm"
                  rel="noopener noreferrer"
                  target={external ? "_blank" : ""}
                >
                  <SocialIcon name={icon} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center font-medium mt-8">
        Sit commodo est exercitation culpa aliqua pariatur.
      </p>
    </footer>
  );
};

export default Footer;
