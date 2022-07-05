const Sequelize = require('sequelize');

const db = {};

db.MAIN_DATABASE = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		logging: true,
		pool: { max: 5, min: 0, idle: 10000 }
	}
);

db.MAIN_DATABASE.authenticate()
	.then(() => console.log('Database connected!!'))
	.catch(err => console.log('Database not connected: ', err));

module.exports = db;
