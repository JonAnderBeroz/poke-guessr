export function playSound(path: string): void {
  const audio = new window.Audio(path);

  audio.volume = 1;
  audio.play();
}
