import { apolloClient } from './graphql/apolloClient'

import {
  doesUserExists,
  isUserACook,
  login,
  requestPasswordRecoveryOverEmail,
  requestUserActivationOverEmail,
  addUser,
  changePasswordWithToken
} from './User'

import {
  DOES_USER_EXISTS,
  ADD_USER,
  IS_USER_A_COOK,
  LOGIN,
  REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL,
  REQUEST_USER_ACTIVATION_URL_OVER_EMAIL,
  CHANGE_PASSWORD_WITH_TOKEN
} from './graphql/UserQueries'

jest.mock('./graphql/apolloClient', () => ({ apolloClient: { query: jest.fn(), mutate: jest.fn() } }))

beforeAll(() => {
  apolloClient.query.mockImplementation((_) => ({
    data: {
      doesUserExists: { query: _.query, variables: _.variables },
      isACook: { query: _.query, variables: _.variables },
      login: { query: _.query, variables: _.variables },
      requestPasswordRecoveryUrlOverEmail: { query: _.query, variables: _.variables },
      requestUserActivationOverEmail: { query: _.query, variables: _.variables }
    }
  }))
  apolloClient.mutate.mockImplementation((_) => ({
    data: {
      addUser: { mutation: _.mutation, variables: _.variables },
      changePasswordWithToken: { mutation: _.mutation, variables: _.variables }
    }
  }))
})

test('Check user existence successfully', () =>
  expect(doesUserExists('email')).resolves.toEqual({ query: DOES_USER_EXISTS, variables: { email: 'email' } }))

test('Check if user is a cook successfully', () =>
  expect(isUserACook('email', 'token')).resolves.toEqual({ query: IS_USER_A_COOK, variables: { email: 'email', token: 'token' } }))

test('Login successfully', () =>
  expect(login('email', 'password')).resolves.toEqual({ query: LOGIN, variables: { email: 'email', password: 'password' } }))

test('Password recovery requested successfully', () =>
  expect(requestPasswordRecoveryOverEmail('email')).resolves.toEqual({
    query: REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL,
    variables: { email: 'email' }
  }))

test('User activation requested successfully', () =>
  expect(requestUserActivationOverEmail('email')).resolves.toEqual({
    query: REQUEST_USER_ACTIVATION_URL_OVER_EMAIL,
    variables: { email: 'email' }
  }))

test('User added successfully', () => {
  expect(
    addUser({ names: 'names', surnames: 'surnames', email: 'email', password: 'password', isContactAllowed: true, isCook: true })
  ).resolves.toEqual({
    mutation: ADD_USER,
    variables: { names: 'names', surnames: 'surnames', email: 'email', password: 'password', isContactAllowed: true, isCook: true }
  })
})

test('Password changed successfully', () => {
  expect(changePasswordWithToken('password', 'token')).resolves.toEqual({
    mutation: CHANGE_PASSWORD_WITH_TOKEN,
    variables: { password: 'password', token: 'token' }
  })
})

const changeQueryMockToErrorThrowing = () => {
  apolloClient.query.mockImplementation(() => {
    throw new Error()
  })
  apolloClient.mutate.mockImplementation(() => {
    throw new Error()
  })
}

test('Login throws exception', () => {
  changeQueryMockToErrorThrowing()
  expect(login('', '')).resolves.toEqual('')
})

test('Password recovery throws exception', () => {
  changeQueryMockToErrorThrowing()
  expect(requestPasswordRecoveryOverEmail('')).resolves.toEqual('')
})

test('User activation throws exception', () => {
  changeQueryMockToErrorThrowing()
  expect(requestUserActivationOverEmail('')).resolves.toEqual('')
})

test('User throws exception', () => {
  changeQueryMockToErrorThrowing()
  expect(addUser({})).resolves.toEqual(undefined)
})

test('Password throws exception', () => {
  changeQueryMockToErrorThrowing()
  expect(changePasswordWithToken('', '')).resolves.toEqual(false)
})
