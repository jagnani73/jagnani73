import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { NAVBAR_ROUTES } from "../../utils/constants/shared-constants";
import { FoldIcon } from "../../utils/icons";

const Navbar: React.FC = () => {
  const { asPath } = useRouter();

  const [navButton, setNavButton] = useState<boolean>(false);
  const [dropMenu, setDropMenu] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 1024) setNavButton(true);
    else
      window.addEventListener("scroll", () => {
        if (window.scrollY > (asPath === "/" ? 150 : 50)) setNavButton(true);
        else setNavButton(false);
      });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1024) setNavButton(true);
      else
        window.addEventListener("scroll", () => {
          if (window.scrollY > (asPath === "/" ? 150 : 50)) setNavButton(true);
          else setNavButton(false);
        });
    });

    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <nav className="fixed w-full h-28 b md g-blue-100 bg-transparent z-50 flex justify-evenly items-center py-4">
        <figure>
          <div className="w-20 h-20 bg-white" />
        </figure>

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
              className="relative w-fit-content ml-auto"
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
                } absolute z-50 duration-500 overflow-hidden transition-all top-full right-0 bg-steel-blue rounded-md rounded-tr-none`}
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
