"use client";

import Image from "next/image";

import Pokemon from "@/type";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import ConfettiEffect from "./confetty";

export default function AnswerForm({pokemon}: {pokemon: Pokemon}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(true);
  const router = useRouter();

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const input = form.elements.namedItem("pokemonName") as HTMLInputElement;
    const truthy = input.value.localeCompare(pokemon.name, "es", {
      sensitivity: "base",
      ignorePunctuation: true,
    });
    if (truthy < 0) {
      input.value = "";
      setCorrect(false);
      return;
    }
    setCorrect(true);
    setVisible(true);
    generatePokemon({input: input});
  }

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
      <Image
        src={pokemon.image}
        alt="Rapidash image"
        height={350}
        width={350}
        className={`${!visible && "brightness-0"} self-center`}
      />
      <form onSubmit={onFormSubmit} className="flex gap-2">
        <input
          name="pokemonName"
          type="text"
          id="dark_field"
          className={`nes-input is-dark ${!correct && "is-error"}`}
          placeholder="Pikachu, Pidgey ..."
        ></input>
        <button type="submit" className="nes-btn is-primary">
          Adivinar
        </button>
      </form>
    </>
  );
}
