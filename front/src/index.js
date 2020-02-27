import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import './index.css'

import * as serviceWorker from './serviceWorker'

import App from './App'

const GRAPHQL_URL = 'http://localhost:4000/graphql'
export const client = new ApolloClient({ link: createHttpLink({ uri: GRAPHQL_URL }), cache: new InMemoryCache() })

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />,
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
