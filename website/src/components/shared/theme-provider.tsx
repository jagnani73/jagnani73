"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

// The browser-chrome favicon can't read the page theme, so swap it to follow the
// in-app toggle. `icon.svg` (OS-reactive) stays the no-JS / first-paint default;
// once mounted this points the favicon at the variant matching the resolved theme.
const FaviconSync = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const href =
      resolvedTheme === "dark" ? "/site/icon-dark.svg" : "/site/icon-light.svg";
    let link = document.querySelector<HTMLLinkElement>("link#favicon-dynamic");
    if (!link) {
      link = document.createElement("link");
      link.id = "favicon-dynamic";
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [resolvedTheme]);

  return null;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      themes={["dark", "light"]}
      storageKey="jagnani73-mode"
      enableSystem
      disableTransitionOnChange
    >
      <FaviconSync />
      {children}
    </NextThemesProvider>
  );
};
