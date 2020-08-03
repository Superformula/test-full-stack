import {
  ApolloClient,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  ApolloError,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { GraphQLError, printError } from 'graphql';
import { OperationDefinitionNode } from 'graphql/language/ast';
import { resolveGraphQLBaseUrl } from 'config';

/**
 * Apollo client error logging link
 */
export const apolloErrorLoggingLink = onError(
  ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      const errors = graphQLErrors.map((error) => {
        const summary = printError(error);
        const locations = error.locations
          ?.map(
            (location) => `[line: ${location.line} column: ${location.column}]`
          )
          .join(',');
        const extensions = error.extensions?.code;
        return `${summary} locations: ${locations} code: ${extensions}`;
      });
      // eslint-disable-next-line no-console
      console.error(
        `Error(s) while executing graphql request: [${errors.join(',')}]`
      );
    }
    // eslint-disable-next-line no-console
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);

export enum DocumentOperationType {
  UNKNOWN,
  QUERY,
  MUTATION,
}

const findOperationTypeForDocumentNode = (
  node: DocumentNode
): DocumentOperationType => {
  const operationNode = node.definitions.find(
    (def) => def.kind === 'OperationDefinition'
  );
  const { operation } = operationNode as OperationDefinitionNode;
  const opType =
    DocumentOperationType[
      operation.toUpperCase() as keyof typeof DocumentOperationType
    ];
  return opType ?? DocumentOperationType.UNKNOWN;
};

/**
 * Build the Apollo retry link.
 *
 * @param retryOperationTypes Array of retryable operation types
 */
export const buildApolloRetryLink = (
  retryOperationTypes: DocumentOperationType[] = [DocumentOperationType.QUERY]
): RetryLink =>
  new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error, operation): boolean => {
        const operationType = findOperationTypeForDocumentNode(operation.query);
        const isRetryableOperation = retryOperationTypes.includes(
          operationType
        );
        return !!error && isRetryableOperation;
      },
    },
  });

/**
 * Build an Apollo client
 */
export const buildApolloClient = () => {
  const retryLink = buildApolloRetryLink();

  return new ApolloClient({
    uri: resolveGraphQLBaseUrl(),
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      retryLink,
      apolloErrorLoggingLink,
      new HttpLink({ uri: resolveGraphQLBaseUrl() }),
    ]),
    connectToDevTools: true,
  });
};

const buildErrorStrings = (errors: readonly GraphQLError[]): string[] => {
  return errors.map((error) => {
    const summary = printError(error);
    const locations = error.locations
      ?.map((location) => `[line: ${location.line} column: ${location.column}]`)
      .join(',');
    const extensions = error.extensions?.code;
    return `${summary} locations: ${locations} code: ${extensions}`;
  });
};

const buildErrorString = (error: ApolloError): string => {
  const errors = buildErrorStrings(error.graphQLErrors);
  return `Error(s) while executing graphql request: ${
    error.message
  }: [${errors.join(',')}]}`;
};

/**
 * Convert a Apollo error to a string
 *
 * @param e The error object
 */
export const toErrorStr = (e: Error): string => {
  if (e instanceof ApolloError) {
    return buildErrorString(e);
  }
  return `${e.message}: ${e.stack}`;
};
