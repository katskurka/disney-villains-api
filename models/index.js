const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disney_villains', 'fOoL$!', {
  host: 'localhost', dialect: 'mysql', define: { timestamps: true }
})

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
