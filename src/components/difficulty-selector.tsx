"use client";

import {useContext} from "react";

import {OPTIONS} from "@/defaults";
import {DifficultyContext} from "@/providers";
import {isEqual} from "@/utils";

export default function DifficultySelector() {
  const {difficulty, setDifficulty} = useContext(DifficultyContext);

  return (
    <section className="flex gap-3 flex-wrap justify-center">
      {OPTIONS.map((option, i) => {
        return (
          <label key={i}>
            <input
              checked={isEqual(option, difficulty)}
              className="nes-radio is-dark"
              name="answer-dark"
              type="radio"
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
