import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import reducer, { State, Question, Answer } from "./reducer";
import { answerQuestion } from "./thinks";

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

const Component = () => {
  const { questions, answers } = useSelector((state: State): State => state);
  const getAnswer = (question: Question) =>
    answers.find((answer) => answer.key === question.key)?.value;

  return (
    <>
      {questions.map((question) => (
        <QuestionComponent
          key={question.key}
          question={question}
          answerValue={getAnswer(question)}
        />
      ))}
    </>
  );
};

const QuestionComponent = ({
  question,
  answerValue,
}: {
  question: Question;
  answerValue: string | undefined;
}) => {
  const { key, allowed_answers } = question;
  const dispatch = useDispatch();
  const handleAnswerSelect = (answer: Answer) => (e: React.ChangeEvent) =>
    dispatch(answerQuestion({ question, answer }));

  return (
    <>
      <h1>{key}</h1>
      <ul>
        {allowed_answers.map((value) => (
          <pre key={value}>
            <h6>{value}</h6>
            <input
              type="checkbox"
              checked={answerValue === value}
              onChange={handleAnswerSelect({ key, value })}
            />
          </pre>
        ))}
      </ul>
    </>
  );
};

export default App;
