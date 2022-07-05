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
	typeTitle: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null,
		field: 'type_title'
	},
	shortDesc: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null,
		field: 'short_desc'
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		autoIncrement: false,
		comment: null,
		field: 'updated_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_user_type_master',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('userTypeMasterModel', attributes, options);

module.exports = model;
