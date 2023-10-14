"use client";

import {DEFAULT_HEARTS} from "@/defaults";
import {Dispatch, SetStateAction, createContext, useState} from "react";

interface DifficultyStore {
  score: {
    score: number;
    setScore?: Dispatch<SetStateAction<number>>;
  };
  lifes: {
    lifes: number;
    setLifes?: Dispatch<SetStateAction<number>>;
  };
  time: {
    time: number;
    setTime?: Dispatch<SetStateAction<number>>;
  };
}

export const GameStateContext = createContext<DifficultyStore>({
  score: {
    score: 0,
  },
  lifes: {
    lifes: DEFAULT_HEARTS,
  },
  time: {
    time: 10,
  },
});

export default function GameStateProvider({children}: {children: React.JSX.Element}) {
  const [score, setScore] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(DEFAULT_HEARTS);
  const [time, setTime] = useState<number>(10);

  const difficultyStore = {
    score: {score, setScore},
    lifes: {lifes, setLifes},
    time: {time, setTime},
  };
  return <GameStateContext.Provider value={difficultyStore}>{children}</GameStateContext.Provider>;
}
