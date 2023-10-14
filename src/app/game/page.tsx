import api from "@/api";
import AnswerForm from "./answer-form";
import {Pokemon} from "@/type";
import GameStateProvider from "@/providers/game-state-provider";

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
