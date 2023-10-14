"use client";

import {Difficulty} from "@/type";
import {Dispatch, ReactNode, SetStateAction, createContext, useContext, useState} from "react";

export const DifficultyContext = createContext<{
  difficulty: Difficulty;
  setDifficulty?: Dispatch<SetStateAction<Difficulty>>;
}>({difficulty: "Fácil"});

export function DifficultyProvider({children}: {children: ReactNode}) {
  const [difficulty, setDifficulty] = useState<Difficulty>("Fácil");

  const difficultyStore = {difficulty, setDifficulty};
  return (
    <DifficultyContext.Provider value={difficultyStore}>{children}</DifficultyContext.Provider>
  );
}

export function useDifficultyContext(): Difficulty {
  const {difficulty} = useContext(DifficultyContext);
  return difficulty;
}
