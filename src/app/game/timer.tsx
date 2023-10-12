import {useEffect, useState} from "react";

export default function Timer({
  initTime = 10,
  timeEnded,
}: {
  initTime?: number;
  timeEnded: () => void;
}) {
  const [time, setTime] = useState<number>(initTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) {
      timeEnded();
      clearInterval(intervalId);
      return;
    }

    return () => clearInterval(intervalId);
  }, [time, timeEnded]);

  return <span className={`text-4xl ${time < 6 && "text-red-700"}`}>{time}</span>;
}
