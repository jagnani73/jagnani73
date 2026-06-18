"use client";

import { useEffect, useState } from "react";
import { rnd } from "@/utils/functions/random";
import { ARCADE_GAMES } from "@/components/home/arcade-games";
import { ArcadeCard } from "@/components/home/arcade-card";

// The arcade hub: one random game, rendered with the same bare ArcadeCard as the
// all-games board (no tagline, no shuffle). The hub only owns which game is shown;
// the frame, bests, confetti and chime live in ArcadeCard.

export const Arcade = () => {
  const games = ARCADE_GAMES;
  const [idx, setIdx] = useState(0);

  // Randomize the game on the client only — a random index in the initial render
  // would mismatch the server-rendered HTML, so it must happen post-mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only randomization
    setIdx(rnd(games.length));
  }, [games.length]);

  return <ArcadeCard game={games[idx]} />;
};
