import jwt from 'jsonwebtoken'

export const getUserFromToken = token => {
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  } else return ''
}

export const getTokenFromRequest = request => (request.headers.authorization || '').split(' ')[1]
