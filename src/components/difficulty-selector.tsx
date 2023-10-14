"use client";

import {DifficultyContext} from "@/providers/difficulty-provider";
import isEqual from "@/utils/isEqual";
import {useContext} from "react";
import {OPTIONS} from "@/defaults";

export default function DifficultySelector() {
  const {difficulty, setDifficulty} = useContext(DifficultyContext);
  return (
    <section className="flex gap-3">
      {OPTIONS.map((option, i) => {
        return (
          <label key={i}>
            <input
              type="radio"
              className="nes-radio is-dark"
              name="answer-dark"
              checked={isEqual(option, difficulty)}
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
