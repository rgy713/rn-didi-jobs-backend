const HTTP_STATUS = require('../helpers/httpStatus');
const resParams = require('../config/params');
const faqServices = require('../services/faqServices');
const MessageHelper = require('../helpers/MessageHelper')
module.exports = {
	/**
	 * This function used to Get All saved FAQ
	 * @author Didijobs <rgy713>
	 */
	getFAQs: async (request, response) => {
		const params = { ...resParams };
		try {
			params.data = await faqServices.getFaqs();
			if (params.data) {
				params.message = MessageHelper.FAQ_FETCHED
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	}
};

