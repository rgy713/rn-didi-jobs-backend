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
        comment: "Primary Key",
        field: "id",
      },
	idUser: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		primaryKey: true,
		field: 'user_id',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	deviceId: {
		type: DataTypes.STRING(100),
		allowNull: true,
		comment: null,
		field: 'device_id'
	},
	fcmToken: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: null,
		field: 'fcm_token'
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
		field: 'created_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_user_device',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('deviceModel', attributes, options);
model.belongsTo(User, {
	as: 'User',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});
module.exports = model;
