const HTTP_STATUS = require('../helpers/httpStatus');
const errorHelper = require('../helpers/errorHelper');
const resParams = require('../config/params');
const notificationServices = require('../services/notificationServices');
module.exports = {
	/**
	 * This function used to get All Notification
	 * @author Didijobs <rgy713>
	 */
	getNotifications: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const query = request.query;
		const limit = parseInt(query.limit) || 10;
		const offset = parseInt(query.offset) || 0;

		try {
			params.data = await notificationServices.getNotifications(
				idUser,
				limit,
				offset
			);
			if (params.data) {
				params.message = 'notfications fetched successfully';
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Mark read notification
	 * @author Didijobs <rgy713>
	 */
	updateNotification: async (request, response) => {
		const params = { ...resParams };
		const notificationId = request.params.id;
		const { idUser } = request.user;
		try {
			params.data = await notificationServices.updateNotification(
				notificationId,
				idUser
			);
			if (params.data) {
				params.message = 'Notification updated successfully';
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to delete Notification
	 * @author Didijobs <rgy713>
	 */
	deleteNotification: async (request, response) => {
		const params = { ...resParams };
		const { id } = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await notificationServices.deleteNotification(
					id,
					idUser
				);
				if (params.data) {
					params.message = 'Notification deleted successfully.';
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	}
};
