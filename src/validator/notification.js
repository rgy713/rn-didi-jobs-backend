/**
 * This function used to contain Notifications Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	deleteNotification: {
		id: {
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		}
	}
};
