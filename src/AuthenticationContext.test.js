import { AuthenticationContext } from './AuthenticationContext'

jest.mock('react', () => ({ createContext: (_) => _ }))

test('AuthenticationContext should be properly initialized', () => {
  expect(AuthenticationContext.authenticationContext.state.email).toEqual('')
  expect(AuthenticationContext.authenticationContext.state.token).toEqual('')
  expect(AuthenticationContext.authenticationContext.setState).toBeDefined()
})
