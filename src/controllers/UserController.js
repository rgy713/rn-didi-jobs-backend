/**
 * This file contain User related endpoints
 * @author Didijobs <rgy713>
 */
const userServices = require('../services/userServices');
const resParams = require('../config/params');
const HTTP_STATUS = require('../helpers/httpStatus');
const MessageHelper = require('../helpers/MessageHelper');
const bankServices = require('../services/bankServices');
const skillServices = require('../services/skillServices');
const errorHelper = require('../helpers/errorHelper');
module.exports = {
	/**
	 * This function used to Update user profile
	 * @author Didijobs <rgy713>
	 */
	updateProfile: async (request, response) => {
		const body = request.body;
		const params = { ...resParams };
		const { idUser } = request.user;

		try {
			params.data = await userServices.updateUser(body, idUser);
			if (body.firstName && body.lastName) {
				params.message = MessageHelper.NAME_UPDATED;
			} else if (body.location) {
				params.message = MessageHelper.LOCATION_UPDATED;
			} else if (body.phone) {
				params.message = MessageHelper.PHONE_UPDATED;
			} else if (body.userImage) {
				params.message = MessageHelper.IMAGE_UPDATED;
			} else if (body.userType) {
				params.message = MessageHelper.USER_TYPE_UPDATED;
			} else if (body.ssn) {
				params.message = MessageHelper.SSN_UPDATED;
			} else if (body.driverLicenseUrlFront) {
				params.message = MessageHelper.DRIVER_LICENSE_URL_FRONT;
			}
			else if (body.email) {
				params.message = MessageHelper.EMAIL_UPDATED;
			}
			response.status(HTTP_STATUS.OK).send(params);
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to get User Profile
	 * @author Didijobs <rgy713>
	 */
	getProfile: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await userServices.getProfile(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_PROFILE_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			console.log("getProfile",error )
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Update user notification Status
	 * @author Didijobs <rgy713>
	 */
	updateUserNotificationStatus: async (request, response) => {
		const params = { ...resParams };
		const body = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await userServices.updateUserNotificationStatus(
					body,
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.NOTIFICATION_STATUS_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to delete User (After Registration)
	 * @author Didijobs <rgy713>
	 */
	deleteUser: async function (request, response) {
		const params = { ...resParams };
		const user = request.user;
		try {
			params.data = await userServices.deleteUser(user);
			if (params.data) {
				params.message = MessageHelper.USER_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Add User Skill (After Registration)
	 * @author Didijobs <rgy713>
	 */
	addUserSkills: async (request, response) => {
		const params = { ...resParams };
		const { skillIds } = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await skillServices.addUserSkills(
					skillIds,
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.USER_SKILLS_ADDED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Add User Skills
	 * @author Didijobs <rgy713>
	 */
	updateUserSkill: async (request, response) => {
		const params = { ...resParams };
		const { skillIds } = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await skillServices.upadteSkills(
					skillIds,
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.USER_SKILLS_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Add User Bank Account
	 * @author Didijobs <rgy713>
	 */
	addUserBankAccount: async (request, response) => {
		const params = { ...resParams };
		const bankAccount = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await bankServices.addBank(bankAccount, idUser);
				if (params.data) {
					params.message = MessageHelper.USER_BANK_ADDED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Get User Bank Accounts
	 * @author Didijobs <rgy713>
	 */
	getUserBankAccount: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await bankServices.getUserBankAccount(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_BANK_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Get User Bank Account By ID
	 * @author Didijobs <rgy713>
	 */
	getUserBankAccountById: async (request, response) => {
		const params = { ...resParams };
		const accountId = request.params.id;
		try {
			params.data = await bankServices.getUserBankAccountById(accountId);
			if (params.data) {
				params.message = MessageHelper.USER_BANK_FETCHED_BY_ID;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Update User Bank Account
	 * @author Didijobs <rgy713>
	 */
	updateUserBankAccount: async (request, response) => {
		const params = { ...resParams };
		const bankAccount = request.body;
		const id = request.params.id;
		const idUser = request.user.idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await bankServices.updateUserBank(
					bankAccount,
					idUser,
					id
				);
				if (params.data) {
					params.message = MessageHelper.USER_BANK_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to set default Bank Account
	 * @author Didijobs <rgy713>
	 */
	setDefaultBankAccount: async (request, response) => {
		const params = { ...resParams };
		const accountId = request.params.id;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await bankServices.setDefaultBankAccount(
					accountId,
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.ACCOUNT_SET_DEFAULT;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Delete User Bank Account
	 * @author Didijobs <rgy713>
	 */
	deleteUserBankAccount: async (request, response) => {
		const params = { ...resParams };
		const accountId = request.params.id;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await bankServices.deleteUserBankAccount(
					accountId
				);
				if (params.data) {
					params.message = MessageHelper.USER_BANK_DELETED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Get All Skills
	 * @author Didijobs <rgy713>
	 */
	getAllSkill: async (request, response) => {
		const params = { ...resParams };
		try {
			params.data = await userServices.getAllSkill();
			if (params.data) {
				params.message = MessageHelper.COMMON_SKILL_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (err) {
			params.message = MessageHelper.INTERNAL_SERVER_ERR;
			params.status = false;
			params.dev_message = err;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Get All User Skills
	 * @author Didijobs <rgy713>
	 */
	getUserSkill: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await skillServices.getUserSkill(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_SKILL_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Update device token
	 * @author Didijobs <rgy713>
	 */
	updateDeviceToken: async (request, response) => {
		const params = { ...resParams };
		const token = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await userServices.updateDeviceToken(
					token,
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.DEVICE_TOKEN_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.message = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Delete user token
	 * @author Didijobs <rgy713>
	 */
	deleteUserToken: async (request, response) => {
		const params = { ...resParams };
		const deviceId = request.params.id;
		try {
			params.data = await userServices.deleteUserToken(deviceId);
			if (params.data) {
				params.message = MessageHelper.DEVICE_TOKEN_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to get service provider counts in your area
	 * @author Didijobs <rgy713>
	 */
	getServiceProviderCount: async (request, response) => {
		const params = { ...resParams };
		const user = request.user;
		try {
			params.data = await userServices.getServiceProviderCount(user);
			if (params.data || params.data === 0) {
				params.message = MessageHelper.SERVICE_PROVIDER_COUNT_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to get job poster counts in your area
	 * @author Didijobs <rgy713>
	 */
	getJobPosterCount: async (request, response) => {
		const params = { ...resParams };
		const user = request.user;
		try {
			params.data = await userServices.getJobPosterCount(user);
			if (params.data || params.data === 0) {
				params.message = MessageHelper.JOB_POSTER_COUNT_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	}
};
