import { apolloClient } from './apolloClient'

import { login, requestPasswordRecoveryUrlOverEmail, addUser, changePasswordWithToken } from './User'
import { ADD_USER, LOGIN, REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, CHANGE_PASSWORD_WITH_TOKEN } from './UserQueries'

jest.mock('./apolloClient', () => ({ apolloClient: { query: jest.fn(), mutate: jest.fn() } }))

test('Login successfully', () => {
  apolloClient.query.mockImplementation((_) => ({ data: { login: { query: _.query, variables: _.variables } } }))
  expect(login('email', 'password')).resolves.toEqual({ query: LOGIN, variables: { email: 'email', password: 'password' } })
})

test('Password recovery requested successfully', () => {
  apolloClient.query.mockImplementation((_) => ({
    data: { requestPasswordRecoveryUrlOverEmail: { query: _.query, variables: _.variables } }
  }))
  expect(requestPasswordRecoveryUrlOverEmail('email')).resolves.toEqual({
    query: REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL,
    variables: { email: 'email' }
  })
})

test('User added successfully', () => {
  apolloClient.mutate.mockImplementation((_) => ({ data: { addUser: { mutation: _.mutation, variables: _.variables } } }))
  const user = { names: 'names', surnames: 'surnames', email: 'email', password: 'password', contactAllowed: true }
  expect(addUser(user)).resolves.toEqual({
    mutation: ADD_USER,
    variables: { names: 'names', surnames: 'surnames', email: 'email', password: 'password', isEmailContactAllowed: true }
  })
})

test('Password changed successfully', () => {
  apolloClient.mutate.mockImplementation((_) => ({ data: { changePasswordWithToken: { mutation: _.mutation, variables: _.variables } } }))
  expect(changePasswordWithToken('password', 'token')).resolves.toEqual({
    mutation: CHANGE_PASSWORD_WITH_TOKEN,
    variables: { password: 'password', token: 'token' }
  })
})

test('Login throws exception', () => {
  apolloClient.query.mockImplementation(() => {
    throw new Error()
  })
  expect(login('', '')).resolves.toEqual('')
})

test('Password throws exception', () => {
  apolloClient.query.mockImplementation(() => {
    throw new Error()
  })
  expect(requestPasswordRecoveryUrlOverEmail('')).resolves.toEqual('')
})

test('User throws exception', () => {
  apolloClient.mutate.mockImplementation(() => {
    throw new Error()
  })
  expect(addUser({})).resolves.toEqual(undefined)
})

test('Password throws exception', () => {
  apolloClient.mutate.mockImplementation(() => {
    throw new Error()
  })
  expect(changePasswordWithToken('', '')).resolves.toEqual(false)
})
