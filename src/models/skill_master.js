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
	parentId: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		comment: null,
		field: 'parent_id'
	},
	title: {
		type: DataTypes.STRING(256),
		allowNull: true,
		defaultValue: null,
		field: 'title'
	},
	shortDesc: {
		type: DataTypes.STRING(256),
		allowNull: true,
		defaultValue: '1',
		field: 'short_desc'
	},
	multi_select: {
		type: DataTypes.INTEGER(4),
		allowNull: true,
		defaultValue: '1',
		field: 'multi_select'
	},
	status: {
		type: DataTypes.ENUM('1', '0'),
		allowNull: false,
		defaultValue: '1',
		field: 'status'
	},
	type: {
		type: DataTypes.ENUM('category', 'sub-category', 'category-item', 'dropdown'),
		allowNull: false,
		defaultValue: 'category',
		field: 'type'
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
		field: 'created_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_skill_master',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('skillMasterModel', attributes, options);
module.exports = model;
