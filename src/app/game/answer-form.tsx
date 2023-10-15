"use client";

import {revalidatePath} from "next/cache";
import Image from "next/image";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent, useContext, useEffect, useMemo, useState} from "react";

import {DEFAULT_HEARTS, TIME} from "@/defaults";
import {GameStateContext, DifficultyContext} from "@/providers";
import {Pokemon} from "@/type";
import {gameOver, isEqual, padEnd, playSound} from "@/utils";

import ConfettiEffect from "./confetty";
import GameOverDialog from "./game-over-dialog";
import useInterval from "./hooks/useInterval";

function Header({active}: {active: boolean}) {
  const {difficulty} = useContext(DifficultyContext);
  const {
    score: {score},
    lifes: {lifes},
  } = useContext(GameStateContext);

  const heartElement = useMemo(
    () =>
      Array(lifes)
        .fill(0)
        .map((_, index: number) => <i key={index} className="nes-icon is-large heart" />),
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
              <i className="nes-icon is-large heart is-empty " />,
            )}
          </span>
        ) : (
          <Link href="/">Atras</Link>
        )}
        {difficulty === "Insano" && <Timer active={active} timeEnded={gameOver} />}
      </article>
      <span className="text-center text-6xl">{score}</span>
    </header>
  );
}

function Timer({timeEnded, active}: {timeEnded: () => void; active: boolean}) {
  const [time, setTime] = useState(TIME);

  function callback() {
    setTime(time - 1);
    if (time === 1) {
      timeEnded();
    }
  }

  useEffect(() => {
    if (!active) return;
    setTime(TIME);
  }, [active]);

  useInterval(callback, active && time > 0 ? 1000 : null);

  return <span className={`text-4xl ${time < 6 && "text-red-700"}`}>{time}</span>;
}

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
    playSound({path: "/music/runAway.mp3", volume: 0.5, startFrom: 0.2});
    revalidatePath("/game");
  }

  return (
    <form className="flex gap-2" onSubmit={onFormSubmit}>
      <input
        autoComplete="off"
        className={`nes-input is-dark outline-none h-24 ${!correct && "is-error"}`}
        id="dark_field"
        name="pokemonName"
        placeholder="Pikachu, Pidgey ..."
        type="text"
      />

      <article className="flex flex-col justify-center">
        <button className="nes-btn is-primary" type="submit">
          Adivinar
        </button>
        {(difficulty === "Fácil" || difficulty === "Normal") && (
          <button className="nes-btn is-primary" type="button" onClick={handleClick}>
            Escapar
          </button>
        )}
      </article>
    </form>
  );
}

export default function AnswerForm({pokemon}: {pokemon: Pokemon}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);
  const {
    score: {score, setScore},
    lifes: {lifes, setLifes},
  } = useContext(GameStateContext);
  const {difficulty} = useContext(DifficultyContext);

  const router = useRouter();

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const input = form.elements.namedItem("pokemonName") as HTMLInputElement;
    const truthy = isEqual(input.value, pokemon.name);

    if (truthy) {
      playSound({path: "/music/catch.mp3", startFrom: 1});
      setActive(false);
      setScore!(score + 1);
      setCorrect(true);
      setVisible(true);
      generatePokemon({input: input});

      return;
    }

    playSound({path: "/music/wallbump.mp3"});
    input.value = "";
    setCorrect(false);
    if (difficulty !== "Fácil") setLifes!(lifes - 1);
  }

  useEffect(() => {
    if (lifes > 0) return;
    setActive(false);
    gameOver();
  }, [lifes]);

  function generatePokemon({input}: {input: HTMLInputElement}) {
    setTimeout(() => {
      router.refresh();
      setVisible(false);
      input.value = "";
      setActive(true);
    }, 3000);
  }

  return (
    <>
      {visible && <ConfettiEffect />}
      <GameOverDialog answer={pokemon.name} score={score} />
      <Header active={active} />
      <Image
        alt={`${pokemon.name} image`}
        className={`${!visible && "brightness-0"} self-center`}
        height={350}
        src={pokemon.image}
        width={350}
      />
      <Form correct={correct} onFormSubmit={onFormSubmit} />
    </>
  );
}
