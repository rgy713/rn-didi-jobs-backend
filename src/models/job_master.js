const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const JobApplication = require('./job_application');
const JobReport = require('./job_report');
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
	posterId: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		field: 'poster_id',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	paymentMethod: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: null,
		field: 'payment_method'
	},
	location: {
		type: DataTypes.GEOMETRY('POINT'),
		allowNull: true,
		defaultValue: null,
		field: 'location'
	},
	price: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'price'
	},
	platformCommisions: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'platform_commision'
	},
	priorityPosting: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'priority_posting'
	},
	totalPrice: {
		type: DataTypes.FLOAT(),
		allowNull: false,
		defaultValue: null,
		field: 'total_price'
	},
	toolsRequired: {
		type: DataTypes.TINYINT(4),
		allowNull: true,
		defaultValue: null,
		field: 'tools_required'
	},
	description: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'description'
	},
	jobAddress: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: true,
		field: 'job_address'
	},
	images: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'images'
	},
	duration: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'duration'
	},
	disputed: {
		type: DataTypes.TINYINT(),
		allowNull: true,
		defaultValue: 0,
		field: 'disputed'
	},
	disputeCode: {
		type: DataTypes.TINYINT(),
		allowNull: true,
		defaultValue: null,
		field: 'dispute_code'
	},
	durationUnit: {
		type: DataTypes.ENUM('minutes', 'hour', 'day', 'week'),
		allowNull: true,
		defaultValue: null,
		field: 'duration_unit'
	},
	currentLocation: {
		type: DataTypes.ENUM('1', '0'),
		allowNull: true,
		field: 'current_location'
	},
	status: {
		type: DataTypes.ENUM(
			'new',
			'completed',
			'cancelled',
			'deleted',
			'in-process'
		),
		allowNull: true,
		defaultValue: 'new',
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
	tableName: 'tbl_kjobs_job_master',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('jobMasterModel', attributes, options);
// model.hasMany(JobApplication, {
// 	as: 'jobApplications',
// 	foreignKey: 'jobId',
// });
model.hasMany(JobReport, {
	as: 'reports',
	foreignKey: 'jobId'
});
module.exports = model;
