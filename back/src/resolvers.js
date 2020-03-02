import { AuthenticationError } from 'apollo-server'

import { User } from './orm'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

// TODO - Add execute around for authentication and AuthenticationError throwing
export default {
  Query: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email: email } })
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' })
      else return ''
    },
    requestPasswordRecoveryUrlOverEmail: async (parent, { email }) => {
      if (await User.findOne({ where: { email: email } })) {
        console.log(jwt.sign({ email: email, date: Date.now() }, process.env.JWT_SECRET, { expiresIn: '10m' })) // TODO - Send over email
        return true
      }
      return false
    }
  },
  Mutation: {
    addUser: async (parent, { user }) => {
      if (User.findOne({ where: { email: user.email } })) {
        throw new AuthenticationError()
      }
      User.create({ ...user })
    },
    updateUser: async (parent, { user }, { authenticatedUserEmail }) => {
      if (authenticatedUserEmail) return User.update({ ...user }, { where: { email: user.authenticatedUserEmail } })
      else throw new AuthenticationError()
    }
  }
}
