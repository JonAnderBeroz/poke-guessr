import {useRouter} from "next/navigation";

export default function GameOverDialog({answer, score}: {answer: string; score: number}) {
  const router = useRouter();
  return (
    <dialog className="nes-dialog is-dark is-rounded" id="dialog-dark-rounded">
      <form method="dialog" className="flex items-center flex-col gap-3">
        <p className="title text-3xl">Game over!</p>
        <p>{`El nombre del pokemon era: ${answer}`}</p>
        <p>{`Has logrado ${score} puntos`}</p>
        <menu className="dialog-menu">
          <button className="nes-btn is-primary" onClick={() => router.push("/")}>
            Volver a empezar
          </button>
        </menu>
      </form>
    </dialog>
  );
}
