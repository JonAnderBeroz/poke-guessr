import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-8 flex-col">
      <h1 className="text-5xl">¿Quien es ese Pokémon?</h1>
      <Link href="/game" className="nes-btn is-primary px-7 py-2 m-auto">
        Play
      </Link>
    </main>
  );
}
