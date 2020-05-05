import gql from 'graphql-tag'

export const DOES_USER_EXISTS = gql`
  query($email: String) {
    doesUserExists(email: $email)
  }
`

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

export const REQUEST_USER_ACTIVATION_URL_OVER_EMAIL = gql`
  query($email: String) {
    requestUserActivationUrlOverEmail(email: $email)
  }
`

export const ADD_USER = gql`
  mutation($names: String, $surnames: String, $email: String!, $password: String!, $isContactAllowed: Boolean!, $isCook: Boolean!) {
    addUser(
      user: { names: $names, surnames: $surnames, email: $email, password: $password, isContactAllowed: $isContactAllowed, isCook: $isCook }
    ) {
      id
      names
      surnames
      email
      password
      isContactAllowed
      isCook
    }
  }
`

export const ACTIVATE_USER = gql`
  mutation($token: String) {
    activateUser(token: $token)
  }
`

export const CHANGE_PASSWORD_WITH_TOKEN = gql`
  mutation($password: String, $token: String) {
    changePasswordWithToken(password: $password, token: $token)
  }
`
