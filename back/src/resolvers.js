import { User } from './orm'

export default {
  Query: {
    userByEmail: (parent, args) => User.findOne({ where: { email: args.email } })
  },

  Mutation: {
    addUser: (parent, args) =>
      User.create({
        names: args.user.names,
        surnames: args.user.surnames,
        email: args.user.email,
        password: args.user.password,
        isEmailContactAllowed: args.user.isEmailContactAllowed
      })
  }
}
