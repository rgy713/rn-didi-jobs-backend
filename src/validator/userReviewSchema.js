/**
 * This function used to contain User Feedback Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	createUserReview: {
		idUser: {
			isLength: {
				errorMessage: 'userId is required',
				options: { min: 1 }
			}
		},
		ratings: {
			isLength: {
				errorMessage: 'ratings is required',
				options: { min: 1, max: 3 }
			}
		}
	}
};
