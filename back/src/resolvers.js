import { AuthenticationError } from 'apollo-server'

import { User } from './orm'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { sendEmail } from './modules'

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
      console.log('requestPasswordRecoveryUrlOverEmail')
      if (await User.findOne({ where: { email: email } })) {
        sendEmail(email, await jwt.sign({ email: email, date: Date.now() }, process.env.JWT_SECRET, { expiresIn: '10m' }))
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
      User.create({
        names: user.names,
        surnames: user.surnames,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        isEmailContactAllowed: user.isEmailContactAllowed
      })
    },
    changePasswordWithToken: async (parent, { password, token }) => {
      try {
        const tokenExtractedEmail = jwt.verify(token, process.env.JWT_SECRET).email
        User.update({ password: await bcrypt.hash(password, 10) }, { where: { email: tokenExtractedEmail } })
        return true
      } catch (error) {
        return false
      }
    }
  }
}
