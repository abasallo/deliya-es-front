import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const REACT_APP_GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: REACT_APP_GRAPHQL_URL }),
  cache: new InMemoryCache()
})
