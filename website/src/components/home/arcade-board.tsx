"use client";

import { ARCADE_GAMES } from "@/components/home/arcade-games";
import { ArcadeCard } from "@/components/home/arcade-card";

// Every arcade game laid out at once — no shuffle. Each card scores and persists
// to the same `arcade.best.<key>` slots as the home hub. `.arcade-card-w`
// (globals.css) sizes each card to the exact home-arcade width.
export const ArcadeBoard = () => (
  <div className="flex flex-wrap justify-center gap-6 px-4 py-6 rail:gap-x-12 rail:gap-y-6 rail:px-11 rail:py-9">
    {ARCADE_GAMES.map((g) => (
      <div key={g.key} className="arcade-card-w">
        <ArcadeCard game={g} />
      </div>
    ))}
  </div>
);
