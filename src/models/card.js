const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const attributes = {
	cardId: {
		type: DataTypes.STRING(255),
		allowNull: false,
		primaryKey: true,
		comment: 'Primary Key',
		field: 'card_id'
	},
	idUser: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		field: 'user_id'
	},
	cardNumber: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: null,
		field: 'card_number'
	},
	cardHolderName: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: null,
		field: 'card_holder_name'
	},
	expiryMonth: {
		type: DataTypes.STRING(2),
		allowNull: false,
		defaultValue: null,
		field: 'expiry_month'
	},
	expiryYear: {
		type: DataTypes.STRING(2),
		allowNull: false,
		defaultValue: null,
		field: 'expiry_year'
	},
	default: {
		type: DataTypes.TINYINT(1),
		allowNull: true,
		defaultValue: 0,
		field: 'is_default'
	},
	cardType: {
		type: DataTypes.STRING(100),
		field: 'card_type'
	},
	status: {
		type: DataTypes.ENUM('active', 'inactive', 'deleted'),
		allowNull: true,
		defaultValue: 'active',
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
		field: 'updated_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_card_details',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('CardDetailsModel', attributes, options);

module.exports = model;
