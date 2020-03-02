import jwt from 'jsonwebtoken'

export const getUserFromToken = token => (token ? jwt.verify(token, process.env.JWT_SECRET).email : '')

export const getTokenFromRequest = request => (request.headers.authorization || '').split(' ')[1]
