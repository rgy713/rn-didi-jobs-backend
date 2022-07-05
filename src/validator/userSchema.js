/**
 * This function used to contain User Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	updateNotificationStatus: {
		notificationStatus: {
			// in: ['body'],
			isLength: {
				errorMessage: 'Notification status is missing',
				options: { min: 1 }
			}
		}
	}
};
