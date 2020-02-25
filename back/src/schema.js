import { gql } from 'apollo-server'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    eventStates: [EventState]!
    eventState(id: ID!): EventState
  }

  type Mutation {
    addBenchmarking(eventState: EventStateInput!): EventState
  }

  type EventState {
    id: ID!
    picture: String
    name: String
    description: String
    map: GoogleMap
    todoList: [ListItem]!
    productList: [ListItem]!
  }

  input EventStateInput {
    picture: String
    name: String
    description: String
    mapId: ID
    todoList: [ID]!
    productList: [ID]!
  }

  type GoogleMap {
    id: ID!
    title: String
    src: String
  }

  input GoogleMapInput {
    title: String
    src: String
  }

  type ListItem {
    id: ID!
    primary: String
    secondary: String
  }

  input ListItemInput {
    primary: String
    secondary: String
  }
`
