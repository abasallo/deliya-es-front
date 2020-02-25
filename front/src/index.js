import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import gql from 'graphql-tag'

import './index.css'

import * as serviceWorker from './serviceWorker'

import App from './App'

const client = new ApolloClient({ link: createHttpLink({ uri: 'http://localhost:4000/graphql' }), cache: new InMemoryCache() })

const query = gql`
  query {
    eventStates {
      id
      picture
      name
      description
      map {
        id
        title
        src
      }
      todoList {
        id
        primary
        secondary
      }
      productList {
        id
        primary
        secondary
      }
    }
  }
`

client.query({ query }).then(response => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App eventState={response.data.eventStates[0]} />
    </ApolloProvider>,
    document.getElementById('root')
  )
})

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
