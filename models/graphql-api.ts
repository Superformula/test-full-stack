import { API as AmplifyAPI, graphqlOperation } from 'aws-amplify'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { GraphQLAPIClass } from '@aws-amplify/api-graphql'

export interface GraphQLOptions {
  input?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  authMode?: GRAPHQL_AUTH_MODE;
}

async function callGraphQL<T>(
  query: unknown,
  options?: GraphQLOptions | Record<string, unknown>,
  API?: unknown
): Promise<GraphQLResult<T>> {
  const APIInstance = (API || AmplifyAPI) as GraphQLAPIClass
  return (await APIInstance.graphql(
    graphqlOperation(query, options)
  )) as GraphQLResult<T>
}

export default callGraphQL
