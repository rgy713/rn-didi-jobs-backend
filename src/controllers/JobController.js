const jobServices = require('../services/jobServices');
const resParams = require('../config/params');
const HTTP_STATUS = require('../helpers/httpStatus');
const MessageHelper = require('../helpers/MessageHelper');
const errorHelper = require('../helpers/errorHelper');
module.exports = {
	/**
	 * This function used to Create Job from Job Poster
	 * @author Didijobs <rgy713>
	 */
	createJob: async (request, response) => {
		const params = { ...resParams };
		const job = request.body;
		const { idUser } = request.user;
		job.posterId = idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.createJob(job);
				if (params.data) {
					params.message = MessageHelper.JOB_CREATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.message = error.message;
				params.data = error;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to get all jobs of a user
	 * @author Didijobs <rgy713>
	 */
	getMyJobs: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await jobServices.getMyJobs(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_JOBS_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to get User job by status
	 * @author Didijobs <rgy713>
	 */
	getCurrentJob: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await jobServices.getCurrentJob(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_OPEN_JOB_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to cancel a job
	 * @author Didijobs <rgy713>
	 */
	cancelJob: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;

		try {
			params.data = await jobServices.cancelJob(jobId);
			if (params.data) {
				params.message = MessageHelper.JOB_CANCELED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to complete a job
	 * @author Didijobs <rgy713>
	 */
	completeJob: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;

		try {
			params.data = await jobServices.completeJob(jobId);
			if (params.data) {
				params.message = MessageHelper.JOB_COMPLETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},

	/**
	 * This function used to Update job
	 * @author Didijobs <rgy713>
	 */
	updateJob: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;
		const job = request.body;
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.updateJob(job, jobId, idUser);
				// console.log('	params.data ', params.data);
				if (params.data) {
					params.message = MessageHelper.JOB_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				} else {
					params.message = MessageHelper.JOB_UPDATED_ERR;
					response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
				}
			} catch (error) {
				params.data = null;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	/**
	 * This function used to Update Job Status
	 * @author Didijobs <rgy713>
	 */
	jobUpdateStatus: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;
		const job = request.body;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.jobUpdateStatus(jobId, job);
				if (params.data) {
					params.message = MessageHelper.JOB_UPDATED;
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
	 * This function used to Delete Job
	 * @author Didijobs <rgy713>
	 */
	deleteJob: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;

		try {
			params.data = await jobServices.deleteJob(jobId);
			if (params.data) {
				params.message = MessageHelper.JOB_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Get all posted Jobs
	 * @author Didijobs <rgy713>
	 */
	getAllJobs: async (request, response) => {
		const params = { ...resParams };
		const userLatLong = request.body;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.getAllJobs(userLatLong);
				if (params.data) {
					params.message = MessageHelper.JOB_FETCHED_ALL;
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
	 * This function used to Insert User Feedback
	 * @author Didijobs <rgy713>
	 */
	createUserReview: async (request, response) => {
		const params = { ...resParams };
		const userReview = request.body;
		const { idUser } = request.user;
		userReview.reviewerId = idUser;
		const err = await errorHelper.checkError(request);
		// console.log(err,userReview)
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.createUserReview(userReview);
				if (params.data) {
					params.message = MessageHelper.USER_REVIEW_ADDED;
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
	 * This function used to Get User Feedback
	 * @author Didijobs <rgy713>
	 */
	getUserReview: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const filter = request.query;
		const userId = request.params.userId;
		try {
			params.data = await jobServices.getUserReview(
				idUser,
				filter,
				userId
			);
			params.message = MessageHelper.USER_REVIEW_FETCHED;
			response.status(HTTP_STATUS.OK).send(params);
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Get User Feedback by review ID
	 * @author Didijobs <rgy713>
	 */
	getUserReviewById: async (request, response) => {
		const params = { ...resParams };
		const reviewId = request.params.id;
		try {
			params.data = await jobServices.getUserReviewById(reviewId);
			if (params.data) {
				params.message = MessageHelper.USER_REVIEW_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Insert Job application for service Provider
	 * @author Didijobs <rgy713>
	 */
	createJobApplication: async (request, response) => {
		const params = { ...resParams };
		const jobApllication = request.body;
		const { idUser } = request.user;
		jobApllication.applicantId = idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.createJobApplication(
					jobApllication
				);
				if (params.data) {
					params.message = MessageHelper.JOB_APPLICATION_ADDED;
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
	 * This function used to Update Job application for service Provider
	 * @author Didijobs <rgy713>
	 */
	updateJobApplication: async (request, response) => {
		const params = { ...resParams };
		const jobApplication = request.body;
		const jobApplicationId = request.params.id;
		const { idUser } = request.user;
		jobApplication.applicantId = idUser;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.updateJobApplication(
					jobApplication,
					jobApplicationId
				);
				if (params.data) {
					params.message = MessageHelper.JOB_APPLICATION_UPDATED;
					response.status(HTTP_STATUS.OK).send(params);
				}
			} catch (error) {
				params.data = error;
				params.message = error.message;
				response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
			}
		}
	},
	cancelJobApplication: async (request, response) => {
		const params = { ...resParams };
		const jobApplicationId = request.params.id;
		try {
			params.data = await jobServices.cancelJobApplication(
				jobApplicationId
			);
			if (params.data) {
				params.message = MessageHelper.JOB_APPLICATION_CANCELLED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Accept Job application for poster
	 * @author Didijobs <rgy713>
	 */
	acceptJobApplication: async (request, response) => {
		const params = { ...resParams };
		const jobApplication = request.body;
		const jobApplicationId = request.params.id;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.acceptJobApplication(
					jobApplication,
					jobApplicationId
				);
				if (params.data) {
					params.message = MessageHelper.JOB_APPLICATION_ACCEPTED;
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
	 * This function used to get Job application by ID
	 * @author Didijobs <rgy713>
	 */
	getJobApplicationById: async (request, response) => {
		const params = { ...resParams };
		const jobApplicationId = request.params.id;
		try {
			params.data = await jobServices.getJobApplicationById(
				jobApplicationId
			);
			if (params.data) {
				params.message = MessageHelper.JOB_APPLICATION_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to get Job application by User ID
	 * @author Didijobs <rgy713>
	 */
	getJobApplicationByUserID: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const err = await errorHelper.checkError(request);
		if (err) {
			params.message = err;
			response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
		} else {
			try {
				params.data = await jobServices.getJobApplicationByUserID(
					idUser
				);
				if (params.data) {
					params.message = MessageHelper.JOB_APPLICATION_FETCHED;
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
	 * This function used to report JOB
	 * @author Didijobs <rgy713>
	 */
	createJobReport: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const jobReport = request.body;
		jobReport.reportedBy = idUser;
		try {
			params.data = await jobServices.createJobReport(jobReport);
			if (params.data) {
				params.message = MessageHelper.JOB_REPORTED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to getAllJobApplications on a single Job
	 * @author Didijobs <rgy713>
	 */
	getAllJobApplications: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;
		try {
			params.data = await jobServices.getAllJobApplicants(jobId);
			if (params.data) {
				params.message = MessageHelper.ALL_JOB_APPLICATION_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to mark JOB as disputed
	 * @author Didijobs <rgy713>
	 */
	markJobDispute: async (request, response) => {
		const params = { ...resParams };
		const jobId = request.params.id;
		const dispute = request.body;
		try {
			params.data = await jobServices.markJobDispute(jobId, dispute);
			if (params.data) {
				params.message = MessageHelper.JOB_DISPUTE_CREATED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	}
};
