import { isEmailValid } from './email'

test('Checks email validity', () => {
  expect(isEmailValid()).toBe(false)
  expect(isEmailValid('')).toBe(false)
  expect(isEmailValid('u@h.t')).toBe(false)
  expect(isEmailValid('user@host')).toBe(false)
  expect(isEmailValid('user@host.tld')).toBe(true)
})
