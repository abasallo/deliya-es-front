import { isEmailValid } from './email'

test('Checks email validity', () => {
  expect(isEmailValid()).toBe(false)
  expect(isEmailValid('')).toBe(false)
  expect(isEmailValid('a@b.c')).toBe(false)
  expect(isEmailValid('alvaro@basallo')).toBe(false)
  expect(isEmailValid('alvaro@basallo.es')).toBe(true)
})
