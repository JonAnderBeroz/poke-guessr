import DifficultySelector from "@/components/difficulty-selector";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-8 flex-col">
      <h1 className="text-5xl text-center">
        ¿Quien es <br /> ese <br /> Pokémon?
      </h1>
      <Link href="/game" className="nes-btn is-primary px-7 py-2 m-auto">
        Play
      </Link>
      <DifficultySelector />
    </main>
  );
}
