import api from "@/api";
import AnswerForm from "./answer-form";
import {Pokemon} from "@/type";

export default async function GameWindow() {
  const pokemon: Pokemon = await api.random();
  return (
    <main className="flex gap-4 flex-col">
      <AnswerForm pokemon={pokemon} />
    </main>
  );
}
