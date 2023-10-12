"use client";

import {DifficultyContext} from "@/providers/difficulty-provider";
import {Difficulty} from "@/type";
import {useContext} from "react";

const OPTIONS: Difficulty[] = ["Fácil", "Normal", "Difícil", "Insano"];

export default function DifficultySelector() {
  const {difficulty, setDifficulty} = useContext(DifficultyContext);
  console.log(difficulty);
  return (
    <section className="flex gap-3">
      {OPTIONS.map((option, i) => {
        console.log(option);
        return (
          <label key={i}>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
              checked={option === "Fácil"}
              onChange={() => {
                setDifficulty!(option);
              }}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </section>
  );
}
