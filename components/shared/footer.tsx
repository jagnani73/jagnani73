import Link from "next/link";

import { SocialIcon } from ".";
import {
  FOOTER_ROUTES,
  SOCIALS_ROUTES,
} from "../../utils/constants/shared-constants";

const Footer: React.FC = () => {
  return (
    <footer className="section-container mb-16">
      <div className="flex flex-col lg:flex-row lg:p-12">
        {FOOTER_ROUTES.map(({ title, routes }) => (
          <div key={title} className="flex flex-col gap-y-2 w-full mb-8">
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
          <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-end">
            <h3 className="font-bold mt-4 lg:mt-0">Yashvardhan Jagnani</h3>
            <figure className="w-16 h-16 rounded-full lg:ml-8 bg-white"></figure>
          </div>

          <div className="flex gap-4 mt-auto pt-8 lg:pt-2 justify-between max-w-xs lg:max-w-none">
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

      <p className="lg:text-center font-medium mt-8">
        Sit commodo est exercitation culpa aliqua pariatur.
      </p>
    </footer>
  );
};

export default Footer;
