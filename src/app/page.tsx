import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-4">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png"
        alt="Rapidash image"
        height={250}
        width={250}
      />
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png"
        alt="Rapidash image"
        height={250}
        width={250}
        className="brightness-0"
      />
    </main>
  );
}
