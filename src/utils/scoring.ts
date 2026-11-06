import type { Answers, ExamResult, Question } from "@/types";

export function calculateScore(
  questions: Question[],
  answers: Answers,
): ExamResult {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  for (const question of questions) {
    const answer = answers[question.id];

    if (answer === undefined) {
      unanswered += 1;
    } else if (answer === question.correct) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }

  return {
    score: correct * 10,
    correct,
    wrong,
    unanswered,
  };
}
