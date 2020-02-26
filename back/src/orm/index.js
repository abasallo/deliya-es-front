import Sequelize from 'sequelize'

const dbDialect = process.env.DB_DIALECT || 'sqlite'
const dbPath = process.env.DB_PATH || 'deliya.sqlite'

const sequelize = new Sequelize({
  dialect: dbDialect,
  storage: dbPath,
  pool: { max: 5, min: 0, idle: 10000 }
})

export const User = sequelize.define('user', { username: { type: Sequelize.STRING }, password: { type: Sequelize.STRING } })

// TODO - Refactor with async/await
export const initSequelize = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
      User.sync({ force: true }).then(() => User.create({ username: 'alvaro@basallo.es', password: 'ojete' }))
    })
    .catch(err => console.error('Unable to connect to the database:', err))
}
