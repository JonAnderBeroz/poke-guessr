"use client";

import Image from "next/image";

import {FormEvent, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import ConfettiEffect from "./confetty";
import padEnd from "@/utils/array-padEnd";
import GameOverDialog from "./game-over-dialog";
import {DifficultyContext} from "@/providers/difficulty-provider";
import {Pokemon} from "@/type";
import Timer from "./timer";
import gameOver from "@/utils/game-over";
import Link from "next/link";

const DEFAULT_HEARTS = 3;

function Form({
  correct,
  onFormSubmit,
}: {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  correct: boolean;
}) {
  const {difficulty} = useContext(DifficultyContext);
  const router = useRouter();
  function handleClick() {
    router.refresh();
  }
  return (
    <form onSubmit={onFormSubmit} className="flex gap-2">
      <input
        autoComplete="off"
        name="pokemonName"
        type="text"
        id="dark_field"
        className={`nes-input is-dark outline-none h-24 ${!correct && "is-error"}`}
        placeholder="Pikachu, Pidgey ..."
      ></input>

      <article className="flex flex-col justify-center">
        <button type="submit" className="nes-btn is-primary">
          Adivinar
        </button>
        {(difficulty === "Fácil" || difficulty === "Normal") && (
          <button type="button" onClick={handleClick} className="nes-btn is-primary">
            Escapar
          </button>
        )}
      </article>
    </form>
  );
}

function Header({lifes, score}: {lifes: number; score: number}) {
  const {difficulty} = useContext(DifficultyContext);

  const heartElement = useMemo(
    () =>
      Array(lifes)
        .fill(0)
        .map((i: number) => <i key={i} className="nes-icon is-large heart"></i>),
    [lifes],
  );

  return (
    <header className="flex flex-col gap-6">
      <article className="flex gap-2 items-center justify-between">
        {difficulty !== "Fácil" ? (
          <span>
            {padEnd<React.JSX.Element>(
              heartElement,
              DEFAULT_HEARTS,
              <i className="nes-icon is-large heart is-empty "></i>,
            )}
          </span>
        ) : (
          <Link href="/">Atras</Link>
        )}
        {difficulty === "Insano" && <Timer timeEnded={gameOver} />}
      </article>
      <span className="text-center text-6xl">{score}</span>
    </header>
  );
}

export default function AnswerForm({pokemon}: {pokemon: Pokemon}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [lifes, setLifes] = useState<number>(DEFAULT_HEARTS);

  const {difficulty} = useContext(DifficultyContext);

  const router = useRouter();

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const input = form.elements.namedItem("pokemonName") as HTMLInputElement;
    const truthy = input.value.localeCompare(pokemon.name, "es", {
      sensitivity: "base",
      ignorePunctuation: true,
    });
    if (truthy === 0) {
      setScore(score + 1);
      setCorrect(true);
      setVisible(true);
      generatePokemon({input: input});
      return;
    }

    input.value = "";
    setCorrect(false);
    if (difficulty !== "Fácil") setLifes(lifes - 1);
  }

  useEffect(() => {
    if (lifes > 0) return;
    gameOver();
  }, [lifes]);

  function generatePokemon({input}: {input: HTMLInputElement}) {
    setTimeout(() => {
      router.refresh();
      setVisible(false);
      input.value = "";
    }, 3000);
  }

  return (
    <>
      {visible && <ConfettiEffect />}
      <GameOverDialog answer={pokemon.name} score={score} />
      <Header lifes={lifes} score={score} />
      <Image
        src={pokemon.image}
        alt="Rapidash image"
        height={350}
        width={350}
        className={`${!visible && "brightness-0"} self-center`}
      />
      <Form onFormSubmit={onFormSubmit} correct={correct}></Form>
    </>
  );
}
