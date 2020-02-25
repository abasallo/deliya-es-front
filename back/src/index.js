import { ApolloServer } from 'apollo-server'

import typeDefs from './schema'
import resolvers from './resolvers'

require('dotenv').config()

new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}`))
