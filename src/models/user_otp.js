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
		comment: null,
		field: 'user_id',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	otp: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: null,
		field: 'otp'
	},
	otpType: {
		type: DataTypes.ENUM('email', 'mobile'),
		allowNull: true,
		defaultValue: null,
		field: 'otp_type'
	},
	totalOtpCount: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: 0,
		field: 'total_otp_count'
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_user_otp',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('userOtpModel', attributes, options);
module.exports = model;
