import {
  QUESTION_ANSWERED_ACTION_TYPE,
  QuestionAnsweredActionPayload,
} from "./actions";

export const answerQuestion = (payload: QuestionAnsweredActionPayload) => ({
  type: QUESTION_ANSWERED_ACTION_TYPE,
  payload,
});
