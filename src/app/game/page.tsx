import api from "@/api";
import {GameStateProvider} from "@/providers";
import {Pokemon} from "@/type";

import AnswerForm from "./answer-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GameWindow() {
  const pokemon: Pokemon = await api.random();

  return (
    <main className="flex gap-4 flex-col">
      <GameStateProvider>
        <AnswerForm pokemon={pokemon} />
      </GameStateProvider>
    </main>
  );
}
