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
    console.log(error) // TODO - Replace by something env dependent
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
    console.log(error) // TODO - Replace by something env dependent
    return {}
  }
}
