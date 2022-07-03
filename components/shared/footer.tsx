import Link from "next/link";

import { SocialIcon } from ".";
import { CoffeeIcon } from "../../utils/icons";
import {
  FOOTER_ROUTES,
  SOCIALS_ROUTES,
} from "../../utils/constants/shared-constants";
import { NextLogo } from "../../utils/logos";

const Footer: React.FC = () => {
  return (
    <footer className="bg-jet mt-8">
      <div className="w-full p-10 pb-4 lg:w-10/12 mx-auto">
        <div className="flex flex-col lg:flex-row">
          {FOOTER_ROUTES.map(({ title, routes }) => (
            <div
              key={title}
              className="flex flex-col gap-y-2 w-full mb-8 lg:mb-0"
            >
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
            <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:flex-wrap-reverse lg:justify-between">
              <h3 className="font-bold mt-4 lg:mt-0 whitespace-nowrap">
                Yashvardhan Jagnani
              </h3>
              <img
                src="/logo.png"
                alt="jagnani73.com | Yashvardhan Jagnani"
                className="w-28"
              />
            </div>

            <div className="flex gap-x-4 mt-auto pt-8 lg:pt-2 justify-between max-w-xs lg:max-w-none">
              {SOCIALS_ROUTES.map(({ href, external, icon }) => (
                <Link key={href} href={href}>
                  <a
                    className="uppercase text-sm w-6 lg:w-8"
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

        <p className="lg:text-center font-medium mt-16 flex flex-wrap items-center justify-center">
          Developed by
          <span className="mx-1 font-bold relative after:absolute after:w-full after:bottom-0 after:h-0.5 after:bg-steel-blue after:left-0">
            Yashvardhan Jagnani
          </span>
          on
          <span className="w-6 mb-1 mx-1">
            <CoffeeIcon />
          </span>
          and
          <span className="w-10 mx-2">
            <NextLogo />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
