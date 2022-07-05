const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const User = require('./user');
const JobMaster = require('./job_master');
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
	feedback: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'feedback'
	},
	reportedBy: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		comment: null,
		field: 'reported_by',
		references: {
			model: User,
			key: 'idUser'
		}
	},
	reportedTo: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		comment: null,
		field: 'reported_to'
		// references: {
		// 	model: User,
		// 	key: 'idUser'
		// }
	},
	jobId: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		comment: null,
		field: 'job_id',
		references: {
			model: JobMaster,
			key: 'id'
		}
	},
	title: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'title'
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_job_report',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('jobReportModel', attributes, options);
module.exports = model;
