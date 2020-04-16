import { apolloClient } from './graphql/apolloClient'

import {
  DOES_USER_EXISTS,
  LOGIN,
  REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL,
  REQUEST_USER_ACTIVATION_URL_OVER_EMAIL,
  ADD_USER,
  ACTIVATE_USER,
  CHANGE_PASSWORD_WITH_TOKEN
} from './graphql/UserQueries'

export const doesUserExists = async (email) => {
  const { data } = await apolloClient.query({ query: DOES_USER_EXISTS, variables: { email: email } })
  return data.doesUserExists
}

export const login = async (email, password) => {
  try {
    const { data } = await apolloClient.query({ query: LOGIN, variables: { email: email, password: password } })
    return data.login
  } catch (error) {
    return ''
  }
}

export const requestPasswordRecoveryOverEmail = async (email) => {
  try {
    const { data } = await apolloClient.query({ query: REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, variables: { email: email } })
    return data.requestPasswordRecoveryUrlOverEmail
  } catch (error) {
    return ''
  }
}

export const requestUserActivationOverEmail = async (email) => {
  try {
    const { data } = await apolloClient.query({ query: REQUEST_USER_ACTIVATION_URL_OVER_EMAIL, variables: { email: email } })
    return data.requestUserActivationOverEmail
  } catch (error) {
    return ''
  }
}

export const addUser = async (user) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_USER,
      variables: {
        names: user.names,
        surnames: user.surnames,
        email: user.email,
        password: user.password,
        isEmailContactAllowed: user.contactAllowed
      }
    })
    return data.addUser
  } catch (error) {
    return undefined
  }
}

export const activateUser = async (token) => {
  try {
    const { data } = await apolloClient.mutate({ mutation: ACTIVATE_USER, variables: { token: token } })
    return data.activateUser
  } catch (error) {
    return false
  }
}

export const changePasswordWithToken = async (password, token) => {
  try {
    const { data } = await apolloClient.mutate({ mutation: CHANGE_PASSWORD_WITH_TOKEN, variables: { password: password, token: token } })
    return data.changePasswordWithToken
  } catch (error) {
    return false
  }
}
