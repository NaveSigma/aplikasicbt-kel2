export type OptionKey = "A" | "B" | "C" | "D";

export interface Question {
  id: number;
  text: string;
  options: Record<OptionKey, string>;
  correct: OptionKey;
}

export type Answers = Record<number, OptionKey>;

export interface ExamResult {
  score: number;
  correct: number;
  wrong: number;
  unanswered: number;
}
