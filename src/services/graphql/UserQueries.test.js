import {
  DOES_USER_EXISTS,
  IS_USER_A_COOK,
  LOGIN,
  REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL,
  REQUEST_USER_ACTIVATION_URL_OVER_EMAIL,
  ADD_USER,
  CHANGE_PASSWORD_WITH_TOKEN
} from './UserQueries'

test('Check user existence query must be initialized properly', () => expect(DOES_USER_EXISTS).toMatchSnapshot())

test('Check if is a cook query must be initialized properly', () => expect(IS_USER_A_COOK).toMatchSnapshot())

test('Login query must be initialized properly', () => expect(LOGIN).toMatchSnapshot())

test('Password recovery query must be initialized properly', () => expect(REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL).toMatchSnapshot())

test('User activation query must be initialized properly', () => expect(REQUEST_USER_ACTIVATION_URL_OVER_EMAIL).toMatchSnapshot())

test('User add query must be initialized properly', () => expect(ADD_USER).toMatchSnapshot())

test('Password change query must be initialized properly', () => expect(CHANGE_PASSWORD_WITH_TOKEN).toMatchSnapshot())
