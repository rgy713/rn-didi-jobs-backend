const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;

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
		field: 'id_user'
	},
	appVersion: {
		type: DataTypes.STRING(100),
		allowNull: true,
		comment: null,
		field: 'app_version'
	},
	feedback: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'feedback'
	},
	createdAt: {
		type: DataTypes.DATE(),
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_app_feedback',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('feedbackModel', attributes, options);
module.exports = model;
