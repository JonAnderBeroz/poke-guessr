export function playSound({
  path,
  volume = 1,
  startFrom = 0,
}: {
  path: string;
  volume?: number;
  startFrom?: number;
}): void {
  const audio = new window.Audio(path);

  audio.volume = volume;
  audio.currentTime = startFrom;
  audio.play();
}
