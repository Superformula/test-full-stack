import { ApolloClient, ApolloProvider } from '@apollo/client';
import React, { useMemo } from 'react';

import { ChildrenProps } from '../../components/General';
import { InMemoryCache } from '@apollo/client/cache';

export function ApolloClientProvider(props: ChildrenProps) {
  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        uri:
          process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:8899/graphql',
        cache: new InMemoryCache(),
      }),
    []
  );

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
