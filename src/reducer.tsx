import { Action, QUESTION_ANSWERED_ACTION_TYPE } from "./actions";

export interface Question {
  key: string;
  allowed_answers: Array<string>;
}

export interface Answer {
  key: string;
  value: string;
}

export interface State {
  questions: Array<Question>;
  answers: Array<Answer>;
}

const initialState: State = {
  questions: [
    {
      key: "address",
      allowed_answers: ["a", "b", "c"],
    },
    {
      key: "name",
      allowed_answers: ["1", "2", "3"],
    },
  ],
  answers: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case QUESTION_ANSWERED_ACTION_TYPE:
      return setOrUpdateAnswer({ state, action });

    default:
      return state;
  }
};

const setOrUpdateAnswer = ({
  state,
  action,
}: {
  state: State;
  action: any;
}): State => {
  const { answers } = state;
  const { payload } = action;
  const { question, answer } = payload;
  const answerIndex: number = answers.findIndex(
    (answer) => answer.key === question.key
  );
  const replaceAnswerAtIndex = ({
    index,
    newAnswer,
  }: {
    index: number;
    newAnswer: Answer;
  }) =>
    answers.map((_answer: Answer, _index: number) =>
      _index === index ? newAnswer : _answer
    );
  const isAnswered = answerIndex !== -1;
  const updatedAnswers = isAnswered
    ? replaceAnswerAtIndex({ index: answerIndex, newAnswer: answer })
    : answers.concat([answer]);

  return {
    ...state,
    answers: updatedAnswers,
  };
};
