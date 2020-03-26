import { client } from '../../index'

import { LOGIN, REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, ADD_USER, CHANGE_PASSWORD_WITH_TOKEN } from './User.queries'

export const login = async (email, password) => {
  try {
    const { data } = await client.query({ query: LOGIN, variables: { email: email, password: password } })
    return data.login
  } catch (error) {
    return ''
  }
}

export const requestPasswordRecoveryUrlOverEmail = async (email) => {
  try {
    const { data } = await client.query({ query: REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, variables: { email: email } })
    return data.requestPasswordRecoveryUrlOverEmail
  } catch (error) {
    return ''
  }
}

export const addUser = async (user) => {
  try {
    const { data } = await client.mutate({
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

export const changePasswordWithToken = async (password, token) => {
  try {
    const { data } = await client.mutate({ mutation: CHANGE_PASSWORD_WITH_TOKEN, variables: { password: password, token: token } })
    return data.changePasswordWithToken
  } catch (error) {
    return false
  }
}
