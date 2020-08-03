import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { buildApolloClient } from 'graphql/apollo-util';

export const withApolloClient = <T extends object>(
  Component: React.ComponentType<T>
) =>
  class WithApollo extends React.Component {
    readonly apolloClient = buildApolloClient();

    render() {
      const { ...props } = this.props;
      return (
        <ApolloProvider client={this.apolloClient}>
          <Component {...(props as T)} />
        </ApolloProvider>
      );
    }
  };
