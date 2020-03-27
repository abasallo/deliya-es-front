import { LOGIN, REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL, ADD_USER, CHANGE_PASSWORD_WITH_TOKEN } from './UserQueries'

test('Login query must be initialized properly', () => expect(LOGIN).toMatchSnapshot())
test('Password recovery request query must be initialized properly', () =>
  expect(REQUEST_PASSWORD_RECOVERY_URL_OVER_EMAIL).toMatchSnapshot())
test('User add query must be initialized properly', () => expect(ADD_USER).toMatchSnapshot())
test('Password change query must be initialized properly', () => expect(CHANGE_PASSWORD_WITH_TOKEN).toMatchSnapshot())