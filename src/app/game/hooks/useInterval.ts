"use client";

import {useEffect, useRef} from "react";

export default function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (!delay) return;
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
