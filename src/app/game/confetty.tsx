"use client";

import Confetti from "react-confetti";

export default function ConfettiEffect() {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      className="max-w-6xl mx-auto h-full"
      initialVelocityY={800}
    />
  );
}
