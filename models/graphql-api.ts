import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'

export interface GraphQLOptions {
  input?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  authMode?: GRAPHQL_AUTH_MODE;
}

async function callGraphQL<T>(
  query: unknown,
  options?: GraphQLOptions | Record<string, unknown>
): Promise<GraphQLResult<T>> {
  return (await API.graphql(
    graphqlOperation(query, options)
  )) as GraphQLResult<T>
}

export default callGraphQL
