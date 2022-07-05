/**
 * This function used to contain Job Applications Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	createJobApplication: {
		jobId: {
			isLength: {
				errorMessage: 'jobId is required',
				options: { min: 1 }
			}
		}
	},
	updateJobApplicationStatus: {
		jobId: {
			isLength: {
				errorMessage: 'jobId is required',
				options: { min: 1 }
			}
		},
		status: {
			isLength: {
				errorMessage:
					'status is missing or it should contain min 3 characters',
				options: { min: 3 }
			}
		}
	}
};
