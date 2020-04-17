import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const LOCAL_GRAPHQL_BACKEND_URL = 'http://localhost:4000/graphql'

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_BACKEND_URL || LOCAL_GRAPHQL_BACKEND_URL }),
  cache: new InMemoryCache()
})
