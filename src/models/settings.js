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
	platformCommision: {
		type: DataTypes.FLOAT(),
		allowNull: false,
		defaultValue: 3.3,
		field: 'platform_commision'
	},
	priorityBasedCommision: {
		type: DataTypes.FLOAT(),
		allowNull: false,
		defaultValue: 2,
		field: 'priority_based_commision'
	}
};

const options = {
	tableName: 'tbl_kjobs_settings',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('settingsModel', attributes, options);

module.exports = model;
