// @ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import appSyncConfig from "./aws-exports";
import { ApolloProvider, Query } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import gql from "graphql-tag";
import { listUsers } from "./graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import reducer, { State, Question, Answer } from "./reducer";
import { answerQuestion } from "./thinks";

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case "User":
            return `${typename}:${obj.UserID}`;
          default:
            return id;
        }
      }

      return id;
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <Provider store={store}>
          <Router>
            <Route exact path="/" component={Component} />
            <Redirect to="/" />
          </Router>
        </Provider>
      </Rehydrated>
    </ApolloProvider>
  );
}

const Component = () => {
  const { questions, answers } = useSelector((state: State): State => state);
  const getAnswer = (question: Question) =>
    answers.find((answer) => answer.key === question.key)?.value;

  return (
    <Query
      query={gql`
        ${listUsers}
      `}
    >
      {({ loading, error, data }) => {
        console.log({ loading, error, data });

        return questions.map((question) => (
          <QuestionComponent
            key={question.key}
            question={question}
            answerValue={getAnswer(question)}
          />
        ));
      }}
    </Query>
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
