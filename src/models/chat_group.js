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
	senderId: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		field: 'sender_id'
	},
	receiverId: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		field: 'receiver_id'
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
	tableName: 'tbl_kjobs_chat_group',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('chatGroupModel', attributes, options);

module.exports = model;
