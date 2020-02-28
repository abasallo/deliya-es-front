import { gql } from 'apollo-server'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    userByEmail(email: String): User
  }

  type Mutation {
    addUser(user: UserInput!): User
  }

  type User {
    id: ID!
    names: String
    surnames: String
    email: String!
    password: String!
    isEmailContactAllowed: Boolean!
  }

  input UserInput {
    names: String
    surnames: String
    email: String!
    password: String!
    isEmailContactAllowed: Boolean!
  }
`
