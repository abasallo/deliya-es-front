import { apolloClient } from './apolloClient'

import ApolloClient from 'apollo-client'

test('Apollo client must be initialized', () => expect(apolloClient instanceof ApolloClient).toBeTruthy())
