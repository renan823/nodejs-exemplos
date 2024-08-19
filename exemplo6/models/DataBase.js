const Sequelize = require('sequelize')
const sequelize = new Sequelize('<databasename>', '<user>', '<password>', {
	host: '<host>',
	dialect: 'mysql',
})


module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize,
}