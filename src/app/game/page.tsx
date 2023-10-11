import api from "@/api";
import Pokemon from "@/type";
import AnswerForm from "./answer-form";

export default async function GameWindow() {
  const pokemon: Pokemon = await api.random();

  return (
    <main className="flex gap-8 flex-col">
      {/* <Image src={pokemon.image} alt="Rapidash image" height={250} width={250} /> */}
      <AnswerForm pokemon={pokemon} />
    </main>
  );
}
