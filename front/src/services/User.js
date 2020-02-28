import { client } from '../index'

import gql from 'graphql-tag'

const USER_BY_EMAIL = gql`
  query($email: String) {
    userByEmail(email: $email) {
      id
      names
      surnames
      email
      password
      isEmailContactAllowed
    }
  }
`

export const checkUserPasswordByEmail = async (email, password) => {
  try {
    const { data } = await client.query({ query: USER_BY_EMAIL, variables: { email: email } })
    return data.userByEmail.password === password
  } catch (error) {
    console.log(error) // TODO - Replace by something env dependent
    return false
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
        names: 'a',
        surnames: 'b',
        email: 'c',
        password: 'd',
        isEmailContactAllowed: false
      }
    })
    return data.addUser
  } catch (error) {
    console.log(error) // TODO - Replace by something env dependent
    return {}
  }
}
