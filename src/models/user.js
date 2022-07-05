const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const UserSkill = require('./user_skill');
const BankAccount = require('./user_bank_account');
const UserOtp = require('./user_otp');
const UserReview = require('./user_review');
const ChatRoom = require('./chatRooms');
const ChatRoomMessages = require('./chatRoomMessages');
const JobDispute = require('./jobDispute');
const ChatReport = require('./chatMessageReport');
const attributes = {
	idUser: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		defaultValue: null,
		primaryKey: true,
		autoIncrement: true,
		comment: 'Primary Key',
		field: 'id'
	},
	firstName: {
		type: DataTypes.STRING(100),
		allowNull: true,
		comment: null,
		field: 'first_name'
	},
	lastName: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: null,
		field: 'last_name'
	},
	email: {
		type: DataTypes.STRING(256),
		allowNull: true,
		defaultValue: null,
		field: 'email'
	},
	phone: {
		type: DataTypes.STRING(50),
		allowNull: false,
		defaultValue: null,
		field: 'phone'
	},
	userImage: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'user_image'
	},
	userAddress: {
		type: DataTypes.TEXT(),
		allowNull: true,
		defaultValue: null,
		field: 'user_address'
	},
	userType: {
		type: DataTypes.SMALLINT(),
		allowNull: true,
		defaultValue: '1',
		field: 'user_type'
	},
	ssn: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: '1',
		field: 'ssn'
	},
	location: {
		type: DataTypes.GEOMETRY('POINT'),
		allowNull: true,
		defaultValue: null,
		field: 'location'
	},
	firebaseUid: {
		type: DataTypes.STRING(255),
		allowNull: true,
		field: 'firebase_uid',
		unique: true
	},
	emailVerifyStatus: {
		type: DataTypes.ENUM('1', '0'),
		allowNull: true,
		defaultValue: '0',
		field: 'email_verify_status'
	},
	profileStatus: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: 0,
		field: 'profile_status'
	},
	driverLicenseUrlFront: {
		type: DataTypes.TEXT(),
		allowNull: true,
		field: 'driver_license_url_front'
	},
	driverLicenseUrlBack: {
		type: DataTypes.TEXT(),
		allowNull: true,
		field: 'driver_license_url_back'
	},
	notificationStatus: {
		type: DataTypes.SMALLINT(),
		allowNull: true,
		defaultValue: 1,
		field: 'notification_status'
	},
	rating: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: 0,
		field: 'rating'
	},
	firstJobCreatedDate: {
		type: DataTypes.DATE(),
		allowNull: true,
		defaultValue: null,
		field: 'first_job_created_date'
	},
	positiveFeedbackTotal: {
		type: DataTypes.FLOAT(),
		allowNull: true,
		defaultValue: null,
		field: 'positive_feedback_total'
	},
	status: {
		type: DataTypes.ENUM('1', '0'),
		allowNull: true,
		defaultValue: '0',
		field: 'status'
	},
	createdAt: {
		type: DataTypes.DATE(),
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		field: 'created_at'
	},
	updatedAt: {
		type: DataTypes.DATE(),
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		autoIncrement: false,
		comment: null,
		field: 'updated_at'
	}
};

const options = {
	tableName: 'tbl_kjobs_users',
	timestamps: false,
	comment: '',
	indexes: []
};

const model = sequelize.define('userModel', attributes, options);
model.hasMany(UserSkill, {
	as: 'skill',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});
model.hasMany(BankAccount, {
	as: 'bankAccount',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});
model.hasMany(UserReview, {
	as: 'reviews',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});
model.hasOne(UserOtp, {
	as: 'otp',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});

model.belongsToMany(model, {
	through: ChatRoom,
	as: 'receiver',
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});

model.hasMany(ChatRoomMessages, {
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});

model.hasMany(JobDispute, {
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});

model.hasMany(ChatReport, {
	foreignKey: 'idUser',
	sourceKey: 'idUser'
});

module.exports = model;

// ChatRoomMessages.sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// model
//   .create({
//     first_name: "Farooq",
//     driverLicenseUrl: "htts",
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ChatRoomMessages.create({
//   idUser: 1,
//   receiverIdUser: 4,
//   chatRoomId: 1,
// })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// model
//   .findAll({
//     include: {
//       model: ChatRoom,
//       as: "chatInitiator",
//       // as: "receiver",
//       // through: {
//       //   model: ChatRoomMessages,
//       // },
//       where: {
//         idUser: 2,
//       },
//     },
//   })

//   .then((result) => {
//     result.forEach((element) => {
//       console.log(element.dataValues.chatInitiator);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
