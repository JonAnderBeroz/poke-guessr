"use client";

import Confetti from "react-confetti";

export default function ConfettiEffect() {
  return (
    <Confetti
      className="max-w-6xl mx-auto h-full"
      height={window.innerHeight}
      initialVelocityY={800}
      width={window.innerWidth}
    />
  );
}
