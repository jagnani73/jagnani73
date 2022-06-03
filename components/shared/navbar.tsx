import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { navbarRoutes } from "../../utils/constants/shared-constants";
import { FoldIcon } from "../../utils/icons";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [navButton, setNavButton] = useState<boolean>(false);
  const [dropMenu, setDropMenu] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > (router.asPath === "/" ? 150 : 50))
        setNavButton(true);
      else setNavButton(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <nav className="fixed w-full h-28 b g-blue-100 bg-transparent z-50 flex justify-evenly items-center py-4">
        <figure>
          <div className="w-20 h-20 bg-white" />
        </figure>

        {!navButton ? (
          <ul className="flex text-white w-3/4 justify-between">
            {navbarRoutes.map(({ href, name }) => (
              <li key={name}>
                <Link href={href}>
                  <a className="uppercase text-sm">{name}</a>
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
                {navbarRoutes.map((route) => (
                  <li key={route.name} className="m-4">
                    <Link href={route.href}>
                      <a className="uppercase text-sm">{route.name}</a>
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
