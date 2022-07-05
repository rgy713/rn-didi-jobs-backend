/**
 * This file contain card details
 * @author Didijobs <rgy713>
 */
const resParams = require('../config/params');
const HTTP_STATUS = require('../helpers/httpStatus');
const MessageHelper = require('../helpers/MessageHelper');
const authServices = require('../services/authServices');
const errorHelper = require('../helpers/errorHelper');
const cardServices = require('../services/cardServices');
const OtpHelper = require('../helpers/OtpHelper');

module.exports = {
	/**
	 * This function used to Add Payment Card
	 * @author Didijobs <rgy713>
	 */
	addCard: async (request, response) => {
		const params = { ...resParams };
		const card = request.body;
		const { idUser } = request.user;
		card.idUser = idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await cardServices.addCard(card);
				if (params.data === false) {
					params.message = MessageHelper.CARD_ALREADY_ADDED;
					response.status(HTTP_STATUS.OK).send(params);
				} else {
					params.message = MessageHelper.CARD_ADDED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				console.log(error)
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to get Payment Cards of an user
	 * @author Didijobs <rgy713>
	 */
	getUserCards: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await cardServices.getUserCards(idUser);
			if (params.data) {
				params.message = MessageHelper.CARD_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to update Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	updateCard: async (request, response) => {
		const params = { ...resParams };
		const cardId = request.params.id;
		const card = request.body;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await cardServices.updateCard(cardId, card);
				if (params.data) {
					params.message = MessageHelper.CARD_UPDATED;
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
	 * This function used to set default payment card for an user
	 * @author Didijobs <rgy713>
	 */
	setDefaultCard: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const cardId = request.params.id;
		try {
			params.data = await cardServices.setDefaultCard(cardId, idUser);
			if (params.data) {
				(params.message = MessageHelper.CARD_SET_DEFAULT),
					response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to delete a Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	deleteCard: async (request, response) => {
		const params = { ...resParams };
		const cardId = request.params.id;
		try {
			params.data = await cardServices.deleteCard(cardId);
			if (params.data) {
				params.message = MessageHelper.CARD_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to find a default Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	getDefaultCard: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await cardServices.getDefaultCard(idUser);
			if (params.data) {
				params.message = MessageHelper.DEFAULT_CARD_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	}
};
