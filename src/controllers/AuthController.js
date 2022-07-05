/**
 * This file contain Authentication related endpoints
 * @author Didijobs <rgy713>
 */
const resParams = require('../config/params');
const HTTP_STATUS = require('../helpers/httpStatus');
const MessageHelper = require('../helpers/MessageHelper');
const authServices = require('../services/authServices');
const errorHelper = require('../helpers/errorHelper');
const userServices = require('../services/userServices');
const OtpHelper = require('../helpers/OtpHelper');
module.exports = {
	/**
	 * This function used to login user
	 * @author Didijobs <rgy713>
	 */
	login: async (request, response) => {
		const params = { ...resParams };
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
		try {
			params.data = await authServices.login(request.body);
			params.message = MessageHelper.LOGIN_SUCCESS;
			response.status(HTTP_STATUS.OK).send(params);
		} catch (error) {
			params.status = false;
			params.message = error.message;
			response.status(HTTP_STATUS.NOT_AUTHORIZED).send(params);
		}
	},
	/**
	 * This function used to Register
	 * @author Didijobs <rgy713>
	 */
	register: async (request, response) => {
		const params = { ...resParams };
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
		try {
			params.data = await authServices.registerUser(request.body);
			params.message = MessageHelper.LOGIN_REGISTERED;
			response.status(HTTP_STATUS.OK).send(params);
		} catch (error) {
			console.log(error);
			params.status = false;
			params.message = error.message;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
	},
	/**
	 * This function used to verify mobile OTP
	 * @author Didijobs <rgy713>
	 */
	verifyMobileOtp: async (request, response) => {
		const params = { ...resParams };
		const err = await errorHelper.checkError(request);
		console.log(request.body);
		if (err) {
			params.message = err;
			return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
		try {
			params.data = await authServices.verifyMobileOtp(request.body);
			if (params.data) {
				params.message = MessageHelper.MOBILE_OTP_VERIFIED;
				response.status(HTTP_STATUS.OK).send(params);
			} else {
				params.message = MessageHelper.MOBILE_OTP_VERIFICATION_FAILED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			console.log(error);
			params.status = false;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to verify email OTP
	 * @author Didijobs <rgy713>
	 */
	verifyOtp: async (request, response) => {
		const { idUser } = request.user;
		const params = { ...resParams };
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
		try {
			params.data = await authServices.verifyOtp(request.body, idUser);
			if (params.data === false) {
				params.message = MessageHelper.OTP_VERIFICATION_FAILED;
				response.status(HTTP_STATUS.OK).send(params);
			} else {
				params.message = MessageHelper.OTP_VERIFIED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			console.log(error);
			params.status = false;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Generate Email OTP
	 * @author Didijobs <rgy713>
	 */
	generateOtp: async (request, response) => {
		const params = { ...resParams };
		const user = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
		try {
			params.data = await authServices.generateOtp(request.body, user);
			params.message = MessageHelper.SUCCESS;
			response.status(HTTP_STATUS.OK).send(params);
		} catch (error) {
			console.log(error);
			params.status = false;
			params.message = error.message;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		}
	},
	generateMobileOtp: async (request, response) => {
		const phone = request.body.phone;
		const params = { ...resParams };
		try {
			const otp = await OtpHelper.generateMobileOtp(phone);
			if (otp) {
				params.data = await authServices.registerUser(phone, otp);
			}
		} catch (e) {
			console.log('Error in user creation', e);
			params.message = error.message;
			params.data = e;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	getLoginUser: (request, response) => {}
};
