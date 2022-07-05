const { validationResult } = require('express-validator');
module.exports = {
	 /**
	 * This function used to Check validation in API request 
	 * @author Didijobs <rgy713>
	 */
	checkError: async request => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			const err = [];
			errors.array().forEach(error => {
				err.push(error.msg);
			});
			return err;
		}
	}
};
