const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const User = require('./user');
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
		allowNull: true,
		defaultValue: null,
		field: 'user_id',
		references: {
			model: User,
			key: 'user_id'
		}
	},
	reviewerId: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: null,
		field: 'reviewer_id'
	},
	ratings: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'ratings'
	},
	feedback: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'feedback'
	},
	images: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null,
		field: 'images'
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
	}
};

const options = {
	tableName: 'tbl_kjobs_user_review',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('userReviewModel', attributes, options);
module.exports = model;
