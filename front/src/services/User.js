import { client } from '../index'

import gql from 'graphql-tag'

const LOGIN = gql`
  query($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`

export const login = async (email, password) => {
  try {
    const { data } = await client.query({ query: LOGIN, variables: { email: email, password: password } })
    return data.login
  } catch (error) {
    return ''
  }
}

const REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL = gql`
  query($email: String) {
    requestPasswordRecoveryUrlOverEmail(email: $email)
  }
`

export const requestPasswordRecoveryUrlOverEmail = async email => {
  try {
    const { data } = await client.query({ query: REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, variables: { email: email } })
    return data.requestPasswordRecoveryUrlOverEmail
  } catch (error) {
    return ''
  }
}

const ADD_USER = gql`
  mutation($names: String, $surnames: String, $email: String!, $password: String!, $isEmailContactAllowed: Boolean!) {
    addUser(
      user: { names: $names, surnames: $surnames, email: $email, password: $password, isEmailContactAllowed: $isEmailContactAllowed }
    ) {
      id
      names
      surnames
      email
      password
      isEmailContactAllowed
    }
  }
`

export const addUser = async user => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_USER,
      variables: {
        names: user.names,
        surnames: user.surnames,
        email: user.email,
        password: user.password,
        isEmailContactAllowed: user.isEmailContactAllowed
      }
    })
    return data.addUser
  } catch (error) {
    return {}
  }
}

const CHANGE_PASSWORD_WITH_TOKEN = gql`
  mutation($password: String, $token: String) {
    changePasswordWithToken(password: $password, token: $token)
  }
`

export const changePasswordWithToken = async (password, token) => {
  try {
    const { data } = await client.mutate({ mutation: CHANGE_PASSWORD_WITH_TOKEN, variables: { password: password, token: token } })
    return data.changePasswordWithToken
  } catch (error) {
    return false
  }
}
