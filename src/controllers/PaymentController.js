/**
 * This file contain Authenticatio related endpoints
 * @author Didijobs <rgy713>
 */
const HTTP_STATUS = require('../helpers/httpStatus');
const resParams = require('../config/params');
// const httpRequest = require('request');
const { request } = require('express');
const paymenrServices = require('../services/paymentServices');
const MessageHelper = require('../helpers/MessageHelper');

module.exports = {
	initPayment: async (request, response) => {},
	generatePaymentToken: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await paymenrServices.generateToken();
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	confirmPayment: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const jobId = request.params.id;
		try {
			params.data = await paymenrServices.confirmPayment(jobId, idUser);
			if (params.data) {
				params.message = MessageHelper.PAYMENT_SUCCESSFULL;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	updatePaymentStatus: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const jobId = request.params.id;
		try {
			params.data = await paymenrServices.updatePaymentStatus(
				jobId,
				idUser
			);
			if (params.data) {
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	}
};
