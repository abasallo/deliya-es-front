import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL }),
  cache: new InMemoryCache()
})
