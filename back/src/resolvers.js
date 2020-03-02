import { AuthenticationError } from 'apollo-server'

import { User } from './orm'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

// TODO - Add execute around for authentication and AuthenticationError throwing
export default {
  Query: {
    // TODO - This is not used, replace with the first secured endpoint
    userByEmail: (parent, { email }, { user }) => {
      if (user) return User.findOne({ where: { email: email } })
      else throw new AuthenticationError()
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email: email } })
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' })
      else return ''
    }
  },

  Mutation: {
    addUser: async (parent, { user }) =>
      User.create({
        names: user.names,
        surnames: user.surnames,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        isEmailContactAllowed: user.isEmailContactAllowed
      })
  }
}
