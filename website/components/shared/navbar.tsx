/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { NAVBAR_ROUTES, ROUTES } from "../../utils/constants/shared-constants";
import { FoldIcon } from "../../utils/icons";

const Navbar: React.FC = () => {
  const { asPath } = useRouter();

  const [navButton, setNavButton] = useState<boolean>(true);
  const [navButtonVisible, setNavButtonVisible] = useState<boolean>(true);
  const [dropMenu, setDropMenu] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (window.innerWidth <= 1024) setNavButton(true);
    else {
      setNavButton(false);
      window.addEventListener("scroll", () => {
        if (window.scrollY > (asPath === "/" ? 150 : 50)) setNavButton(true);
        else setNavButton(false);
      });
    }

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [asPath]);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= scrollY) setNavButtonVisible(false);
        else setNavButtonVisible(true);

        setScrollY(window.scrollY);
      });

      return () => {
        window.removeEventListener("scroll", () => {});
      };
    }
  }, [scrollY]);

  return (
    <>
      <nav
        className={`fixed transition-all duration-500 w-full left-0 z-40 flex justify-evenly items-center p-4 ${
          navButtonVisible
            ? `top-0${navButton ? " bg-eerie-black" : ""}`
            : "-top-full"
        }`}
      >
        <Link href={ROUTES.HOME}>
          <a>
            <img
              src="/logo.svg"
              alt="Yashvardhan Jagnani | jagnani73.com"
              className="w-12 lg:w-20"
            />
          </a>
        </Link>

        {!navButton ? (
          <ul className="flex text-white w-3/4 justify-between">
            {NAVBAR_ROUTES.map(({ href, name, external }) => (
              <li key={name}>
                <Link href={href}>
                  <a
                    className={`${
                      asPath === href ? "font-semibold " : ""
                    }uppercase text-sm`}
                    rel="noopener noreferrer"
                    target={external ? "_blank" : ""}
                  >
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-3/4 text-right">
            <div
              className="relative w-fit ml-auto"
              onMouseEnter={() => setDropMenu(true)}
              onMouseLeave={() => setDropMenu(false)}
            >
              <button
                className={`${
                  dropMenu ? "" : "rotate-180 "
                }transform w-10 block duration-500`}
                onClick={() => setDropMenu(!dropMenu)}
              >
                <FoldIcon />
              </button>

              <ul
                className={`${
                  dropMenu ? "max-h-screen" : "max-h-0"
                } absolute z-40 duration-500 overflow-hidden transition-all top-full right-0 bg-steel-blue rounded-md rounded-tr-none`}
              >
                {NAVBAR_ROUTES.map(({ href, name, external }) => (
                  <li key={name} className="m-4">
                    <Link href={href}>
                      <a
                        className={`${
                          asPath === href ? "font-semibold " : ""
                        }uppercase text-sm`}
                        onClick={() => setDropMenu(false)}
                        rel="noopener noreferrer"
                        target={external ? "_blank" : ""}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
