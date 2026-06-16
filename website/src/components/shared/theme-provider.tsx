"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={["dark", "light"]}
      storageKey="jagnani73-mode"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};
