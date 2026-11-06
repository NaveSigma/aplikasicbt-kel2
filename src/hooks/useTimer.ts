import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

interface UseTimerOptions {
  startedAt: number | null;
  durationSeconds: number;
  onFinish: () => void;
}

export function useTimer({
  startedAt,
  durationSeconds,
  onFinish,
}: UseTimerOptions): number {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const onFinishRef = useRef(onFinish);
  const finishedRef = useRef(false);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    finishedRef.current = false;

    if (startedAt === null) {
      return;
    }

    const updateRemaining = () => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      const nextRemaining = Math.max(0, durationSeconds - elapsedSeconds);

      setRemainingSeconds(nextRemaining);

      if (nextRemaining === 0 && !finishedRef.current) {
        finishedRef.current = true;
        onFinishRef.current();
      }
    };

    updateRemaining();

    const interval = setInterval(updateRemaining, 1000);

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        updateRemaining();
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [startedAt, durationSeconds]);

  return remainingSeconds;
}
