import { User } from './orm'

export default {
  Query: {
    users: () => User.findAll(),
    userById: (parent, args) => User.findOne({ where: { id: args.id } }),
    userByUsername: (parent, args) => User.findOne({ where: { username: args.id } })
  },

  Mutation: {
    addUser: (parent, args) => User.create({ username: args.user.username, password: args.user.password })
  }
}
