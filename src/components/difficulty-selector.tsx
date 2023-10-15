"use client";

import {useContext} from "react";

import {OPTIONS} from "@/defaults";
import {DifficultyContext} from "@/providers";
import {Difficulty} from "@/type";
import {isEqual, playSound} from "@/utils";

export default function DifficultySelector() {
  const {difficulty, setDifficulty} = useContext(DifficultyContext);

  function selectionChanged(option: Difficulty) {
    playSound({path: "/music/ding.mp3", startFrom: 0.3});
    setDifficulty!(option);
  }

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
              onChange={() => selectionChanged(option)}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </section>
  );
}
