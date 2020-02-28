import { ApolloServer } from 'apollo-server'

import typeDefs from './schema'

import resolvers from './resolvers'

import { initSequelize } from './orm'

import dotenv from 'dotenv'

import { getTokenFromRequest, getUserFromToken } from './modules'

dotenv.config()

initSequelize()

new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: getUserFromToken(getTokenFromRequest(req)) })
})
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}`))

// TODO - Too much information on Authentication errors is returned, is OK in DEV, but should be 401 in PROD
