import { ApolloServer } from 'apollo-server'

import typeDefs from './schema'
import resolvers from './resolvers'

import { initSequelize } from './orm'

import dotenv from 'dotenv'

dotenv.config()

initSequelize()

new ApolloServer({ typeDefs, resolvers })
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}`))
