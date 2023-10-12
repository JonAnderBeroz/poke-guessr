export default function gameOver() {
  const modal: HTMLDialogElement = document.getElementById(
    "dialog-dark-rounded",
  ) as HTMLDialogElement;
  modal.showModal();
}
