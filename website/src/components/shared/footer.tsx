import Link from "next/link";
import Image from "next/image";

import { SocialIcon } from ".";
import { CoffeeIcon } from "@/utils/icons";
import { ROUTES, SOCIALS_ROUTES } from "@/utils/constants/shared-constants";
import { NextLogo } from "@/utils/logos";
import type { FooterRoutes } from "@/utils/types/shared.types";

export const Footer: React.FC = () => {
  const FOOTER_ROUTES: FooterRoutes[] = [
    {
      title: "Sitemap",
      routes: [
        {
          href: ROUTES.HOME,
          name: "Home",
          external: false,
        },
        {
          href: ROUTES.EXPERIENCES,
          name: "Experiences",
          external: false,
        },
        {
          href: ROUTES.PROJECTS,
          name: "Projects",
          external: false,
        },
        {
          href: ROUTES.CONTACT,
          name: "Contact",
          external: false,
        },
      ],
    },
    {
      title: "Featured Projects",
      routes: [
        {
          href: `${ROUTES.PROJECTS}/marquee`,
          name: "react-easy-marquee",
          external: false,
        },
        {
          href: `${ROUTES.PROJECTS}/hospitatva`,
          name: "Hospitatva",
          external: false,
        },
        {
          href: `${ROUTES.PROJECTS}/shikshak`,
          name: "Shikshak",
          external: false,
        },
        {
          href: `${ROUTES.PROJECTS}/contracts`,
          name: "Contracts",
          external: false,
        },
      ],
    },
  ];

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
                <Link
                  key={name + href}
                  href={href}
                  className="uppercase text-sm"
                  rel="noopener noreferrer"
                  target={external ? "_blank" : ""}
                >
                  {name}
                </Link>
              ))}
            </div>
          ))}

          <div className="w-full flex flex-col">
            <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:flex-wrap-reverse lg:justify-between">
              <h3 className="font-bold mt-4 pt-2 lg:mt-0 whitespace-nowrap">
                Yashvardhan Jagnani
              </h3>
              <Image
                src="/loader.svg"
                alt="Loading"
                width={112}
                height={112}
                className="w-28"
              />
            </div>

            <div className="flex gap-x-4 mt-auto pt-8 lg:pt-2 justify-between max-w-xs lg:max-w-none">
              {SOCIALS_ROUTES.map(({ href, external, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="uppercase text-sm w-6 lg:w-8"
                  rel="noopener noreferrer"
                  target={external ? "_blank" : ""}
                >
                  <SocialIcon name={icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="lg:text-center mt-16 flex flex-wrap items-center justify-center">
          Developed by
          <span className="mx-1 font-bold relative after:absolute after:w-full after:bottom-0 after:h-0.5 after:bg-steel-blue after:left-0">
            Yashvardhan Jagnani
          </span>
          on
          <span className="w-6 mb-1 ml-1 mr-2">
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
