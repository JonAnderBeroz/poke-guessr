"use client";

import {DifficultyContext} from "@/providers/difficulty-provider";
import {Difficulty} from "@/type";
import {useContext} from "react";

const OPTIONS: Difficulty[] = ["Fácil", "Normal", "Difícil", "Insano"];

export default function DifficultySelector() {
  const {difficulty, setDifficulty} = useContext(DifficultyContext);
  return (
    <section className="flex gap-3">
      {OPTIONS.map((option, i) => (
        <label key={i}>
          <input
            type="radio"
            className="nes-radio is-dark"
            name="answer-dark"
            checked={option === difficulty}
            onChange={() => {
              setDifficulty!(option);
            }}
          />
          <span>{option}</span>
        </label>
      ))}
    </section>
  );
}
