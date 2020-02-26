import { gql } from 'apollo-server'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [User]!
    userById(id: ID!): User
    userByUsername(username: String): User
  }

  type Mutation {
    addUser(user: UserInput!): User
  }

  type User {
    id: ID!
    username: String
    password: String
  }

  input UserInput {
    username: String
    password: String
  }
`
