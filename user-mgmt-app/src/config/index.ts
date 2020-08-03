const GQL_SERVER_BASE_URL = 'http://localhost:7777/graphql';

// TODO: Make me configurable per environment
export const resolveGraphQLBaseUrl = () => {
  return GQL_SERVER_BASE_URL;
};
