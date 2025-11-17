"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ROUTES } from "@/utils/constants/shared-constants";
import type { NavbarRoutes } from "@/utils/types/shared.types";
import { FoldIcon } from "@/utils/icons";

export const Navbar: React.FC = () => {
  const NAVBAR_ROUTES: NavbarRoutes[] = [
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
  ];

  const pathname = usePathname();

  const [navButton, setNavButton] = useState<boolean>(true);
  const [navButtonVisible, setNavButtonVisible] = useState<boolean>(true);
  const [dropMenu, setDropMenu] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const scrollVisibilityHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (pathname === "/" ? 150 : 50)) {
        setNavButton(true);
      } else {
        setNavButton(false);
      }
    };

    queueMicrotask(() => {
      if (window.innerWidth <= 1024) {
        setNavButton(true);
      } else {
        setNavButton(false);
        scrollHandlerRef.current = handleScroll;
        window.addEventListener("scroll", handleScroll);
      }
    });

    return () => {
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY >= scrollY) setNavButtonVisible(false);
      else setNavButtonVisible(true);

      setScrollY(window.scrollY);
    };

    if (window.innerWidth <= 1024) {
      scrollVisibilityHandlerRef.current = handleScrollVisibility;
      window.addEventListener("scroll", handleScrollVisibility);

      return () => {
        if (scrollVisibilityHandlerRef.current) {
          window.removeEventListener(
            "scroll",
            scrollVisibilityHandlerRef.current
          );
          scrollVisibilityHandlerRef.current = null;
        }
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
          <Image
            src="/logo.svg"
            alt="Yashvardhan Jagnani | jagnani73.com"
            width={80}
            height={80}
            className="w-12 lg:w-20"
          />
        </Link>

        {!navButton ? (
          <ul className="flex text-white w-3/4 justify-between">
            {NAVBAR_ROUTES.map(({ href, name, external }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`${
                    pathname === href ? "font-semibold " : ""
                  }uppercase text-sm`}
                  rel="noopener noreferrer"
                  target={external ? "_blank" : ""}
                >
                  {name}
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
                    <Link
                      href={href}
                      className={`${
                        pathname === href ? "font-semibold " : ""
                      }uppercase text-sm`}
                      onClick={() => setDropMenu(false)}
                      rel="noopener noreferrer"
                      target={external ? "_blank" : ""}
                    >
                      {name}
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
