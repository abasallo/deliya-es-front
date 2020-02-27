import { client } from '../index'

import gql from 'graphql-tag'

const GET_USER_BY_USERNAME = gql`
  query($username: String!) {
    userByUsername(username: $username) {
      id
      username
      password
    }
  }
`

export const isUserPasswordCorrect = async (username, password) => {
  try {
    const { data } = await client.query({ query: GET_USER_BY_USERNAME, variables: { username: username } })
    return data.userByUsername.password === password
  } catch (error) {
    console.log(error) // TODO - Replace by something env dependent
    return false
  }
}
