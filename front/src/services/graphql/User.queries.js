import gql from 'graphql-tag'

export const LOGIN = gql`
  query($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`

export const REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL = gql`
  query($email: String) {
    requestPasswordRecoveryUrlOverEmail(email: $email)
  }
`

export const ADD_USER = gql`
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

export const CHANGE_PASSWORD_WITH_TOKEN = gql`
  mutation($password: String, $token: String) {
    changePasswordWithToken(password: $password, token: $token)
  }
`
