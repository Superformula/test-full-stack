import { Question, Answer } from "./reducer";

export const QUESTION_ANSWERED_ACTION_TYPE = "QUESTION_ANSWERED";
export interface QuestionAnsweredActionPayload {
  question: Question;
  answer: Answer;
}
interface QuestionAnsweredAction {
  type: typeof QUESTION_ANSWERED_ACTION_TYPE;
  payload: QuestionAnsweredActionPayload;
}

export type Action = QuestionAnsweredAction;
