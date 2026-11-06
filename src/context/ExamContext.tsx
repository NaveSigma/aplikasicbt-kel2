import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Answers, OptionKey } from "@/types";

interface ExamContextValue {
  name: string;
  answers: Answers;
  startedAt: number | null;
  setAnswer: (id: number, key: OptionKey) => void;
  startExam: (name: string) => void;
  resetExam: () => void;
}

const ExamContext = createContext<ExamContextValue | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const setAnswer = useCallback((id: number, key: OptionKey) => {
    setAnswers((previous) => ({ ...previous, [id]: key }));
  }, []);

  const startExam = useCallback((participantName: string) => {
    setName(participantName.trim());
    setAnswers({});
    setStartedAt(Date.now());
  }, []);

  const resetExam = useCallback(() => {
    setName("");
    setAnswers({});
    setStartedAt(null);
  }, []);

  const value = useMemo<ExamContextValue>(
    () => ({
      name,
      answers,
      startedAt,
      setAnswer,
      startExam,
      resetExam,
    }),
    [name, answers, startedAt, setAnswer, startExam, resetExam],
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam(): ExamContextValue {
  const context = useContext(ExamContext);

  if (context === undefined) {
    throw new Error("useExam must be used inside an ExamProvider");
  }

  return context;
}
