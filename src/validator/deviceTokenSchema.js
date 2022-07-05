/**
 * This function used to contain Device Tokens Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	updateDeviceToken: {
		deviceId: {
			isLength: {
				errorMessage: 'device id is required',
				options: { min: 1 }
			}
		},
		fcmToken: {
			isLength: {
				errorMessage: 'fcm token is required',
				options: { min: 1 }
			}
		}
	}
};
