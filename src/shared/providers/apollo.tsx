import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider } from '@apollo/client';

import type { PropsWithChildren } from 'react';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export function ApolloProvider({ children }: PropsWithChildren) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
