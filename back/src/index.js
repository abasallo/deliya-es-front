import { ApolloServer } from 'apollo-server'

import typeDefs from './schema'
import resolvers from './resolvers'

import dotenv from 'dotenv'

dotenv.config()

const Sequelize = require('sequelize')
const dbDialect = process.env.DB_DIALECT || 'sqlite'
const dbPath = process.env.DB_PATH || 'deliya.sqlite'
const sequelize = new Sequelize({
  dialect: dbDialect,
  storage: dbPath
})
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}`))
