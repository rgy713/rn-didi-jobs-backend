const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const User = require('./user')
const attributes = {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		primaryKey: true,
		autoIncrement: true,
		comment: 'Primary Key',
		field: 'id'
	},
	idUser: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		field: 'user_id',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	title: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: null,
		field: 'title'
	},
	description: {
		type: DataTypes.TEXT(),
		allowNull: false,
		comment: null,
		field: 'description'
	},
	readStatus: {
		type: DataTypes.ENUM('read', 'new', 'deleted'),
		allowNull: true,
		defaultValue: 'new',
		field: 'read_status'
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	}
	// updatedAt: {
	// 	type: DataTypes.DATE,
	// 	allowNull: false,
	// 	defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
	// 	autoIncrement: false,
	// 	comment: null,
	// 	field: 'updated_at'
	// }
};

const options = {
	tableName: 'notification',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('notificationModel', attributes, options);
module.exports = model;
