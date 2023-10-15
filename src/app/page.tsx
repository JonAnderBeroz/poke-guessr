import Link from "next/link";

import DifficultySelector from "@/components/difficulty-selector";

export default function Home() {
  return (
    <main className="flex gap-8 flex-col">
      <h1 className="text-5xl text-center">
        ¿Quien es <br /> ese <br /> Pokémon?
      </h1>
      <Link className="nes-btn is-primary px-7 py-2 m-auto" href="/game">
        Play
      </Link>
      <DifficultySelector />
    </main>
  );
}
