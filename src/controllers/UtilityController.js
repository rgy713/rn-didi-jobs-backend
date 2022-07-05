/**
 * This file contain Utility related endpoints
 * @author Didijobs <rgy713>
 */
const ImageHelper = require('../helpers/imageHelper');
const MessageHelper = require('../helpers/MessageHelper');
const resParams = require('../config/params');
const HTTP_STATUS = require('../helpers/httpStatus');
const utilityService = require('../services/utilityServices');
const errorHelper = require('../helpers/errorHelper');
module.exports = {
	/**
	 * This function used to Upload Single File on S3
	 * @author Didijobs <rgy713>
	 */
	uploadFile: async (request, response) => {
		const body = request.body;
		const params = { ...resParams };
		if (request.files) {
			const file = request.files.image;
			let location = ImageHelper.LOCATIONS.PRODUCTS;

			if (body.type) {
				location = ImageHelper.LOCATIONS.USER;
			}
			await ImageHelper.uploadImage(file, location).then(fileName => {
				params.message = MessageHelper.FILE_UPLOAD_SUCCESS;
				params.data = {
					name: fileName,
					path: ImageHelper.getImagePath(fileName, location)
				};
				params.status = true;
				response.status(HTTP_STATUS.OK).send(params);
			});
		} else {
			params.message = error.message;
			params.status = true;
			response.status(HTTP_STATUS.BAD_REQUEST).send(params);
		}
	},
	/**
	 * This function used to Upload Multiple Images with resize
	 * @author Didijobs <rgy713>
	 */
	uploadImageWithResize: async (req, res) => {
		const body = req.body;
		const params = { ...resParams };
		params.status = true;
		if (req.files) {
			const image = req.files.image;
			const sizes = [
				{ height: 100, width: 100 },
				{ height: 200, width: 200 },
				{ height: 50, width: 50 }
			];
			let location = ImageHelper.LOCATIONS.PRODUCTS;

			if (body.type) {
				location = ImageHelper.LOCATIONS.USER;
			}
			ImageHelper.resizeAndUpload(image, sizes, location)
				.then(fileName => {
					params.message = MessageHelper.FILE_UPLOAD_SUCCESS;
					params.data = {
						name: fileName,
						path: ImageHelper.getImagePath(fileName, location)
					};
					params.status = true;
					res.status(HTTP_STATUS.OK).send(params);
				})
				.catch(error => {
					params.message = error;
					params.data = false;
					res.status(HTTP_STATUS.BAD_REQUEST).send(params);
				});
		} else {
			params.message = error.message;
			params.status = true;
			res.status(HTTP_STATUS.BAD_REQUEST).send(params);
		}
	},
	createFeedback: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const feedback = request.body;
		feedback.idUser = idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await utilityService.createFeedback(feedback);
				if (params.data) {
					params.message = MessageHelper.FEEDBACK_CREATED;
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
