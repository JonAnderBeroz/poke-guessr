"use client";

import {GameStateContext} from "@/providers/game-state-provider";
import {init} from "next/dist/compiled/webpack/webpack";
import {useContext, useEffect, useState} from "react";

export default function Timer({
  initTime = 10,
  timeEnded,
}: {
  initTime?: number;
  timeEnded: () => void;
}) {
  const {
    time: {time, setTime},
  } = useContext(GameStateContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime!(time - 1);
    }, 1000);
    if (time === 0) {
      timeEnded();
      clearInterval(intervalId);
      return;
    }

    return () => clearInterval(intervalId);
  }, [time, timeEnded, setTime, initTime]);

  return <span className={`text-4xl ${time < 6 && "text-red-700"}`}>{time}</span>;
}
