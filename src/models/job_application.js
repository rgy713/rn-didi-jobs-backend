const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const JobMaster = require('./job_master');
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
	jobId: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: null,
		field: 'job_id',
		references: {
			model: JobMaster,
			key: 'id'
		}
	},
	applicantId: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		defaultValue: null,
		field: 'applicant_id',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	status: {
		type: DataTypes.ENUM(
			'new',
			'accepted',
			'rejected',
			'revoked',
			'deleted',
			'cancelled'
		),
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
	tableName: 'tbl_kjobs_job_application',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('jobApplicationModel', attributes, options);
module.exports = model;
