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
	question: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null,
		field: 'question',
		defaultValue: null
	},
	answer: {
		type: DataTypes.TEXT(),
		allowNull: true,
		comment: null,
		field: 'answer',
		defaultValue: null
	},
	parentId: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: null,
		field: 'parent_id'
	},
	status: {
		type: DataTypes.ENUM('1', '0'),
		allowNull: true,
		defaultValue: '0',
		field: 'status'
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
	tableName: 'tbl_kjobs_faq_master',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('faqModel', attributes, options);

module.exports = model;
