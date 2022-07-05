const JobMaster = require('../models/job_master');
const UserReview = require('../models/user_review');
const JobApplication = require('../models/job_application');
const JobSkills = require('../models/job_skills');
const Sequelize = require('sequelize');
const { Op, QueryTypes } = require('sequelize');
const SkillMaster = require('../models/skill_master');
const sequelize = require('../config/database').MAIN_DATABASE;
const JobReport = require('../models/job_report');
const Settings = require('../models/settings');
const Users = require('../models/user');
const moment = require('moment');
const UserSkills = require('../models/user_skill');
const { validationResult } = require('express-validator');
module.exports = {
	/**
	 * This function used to Create Job
	 * @author Didijobs <rgy713>
	 */
	createJob: async data => {
		let { location, skills, price } = data;
		if (data.images) {
			data.images = data.images.join(',');
		}
		let priceValue = parseFloat(price);
		const res = await Settings.findOne({ where: { id: 1 } });
		const { platformCommision, priorityBasedCommision } = res.dataValues;
		let commisionWithoutPriority, commisionWithPriority;

		commisionWithoutPriority = (price * platformCommision) / 100;
		commisionWithPriority = (price * priorityBasedCommision) / 100;
		//Calculate priority posting
		if (data.priorityPosting && data.priorityPosting === true) {
			data.platformCommisions =
				commisionWithoutPriority + commisionWithPriority;
			data.totalPrice =
				priceValue + commisionWithoutPriority + commisionWithPriority;
		} else {
			data.priorityPosting = false;
			data.platformCommisions = commisionWithoutPriority;
			data.totalPrice = priceValue + commisionWithoutPriority;
		}
		const point = {
			type: 'Point',
			coordinates: [location.long, location.lat]
		};
		data.location = point;
		try {
			let newJob = await JobMaster.create(data);
			newJob = newJob.get({ plain: true });
			if (data.isFirst === 0) {
				const jobs = await JobMaster.findAll({
					where: { posterId: data.posterId }
				});
				if (jobs && jobs.length === 1) {
					await Users.update(
						{
							firstJobCreatedDate: sequelize.literal(
								'CURRENT_TIMESTAMP'
							)
						},
						{ where: { id: data.posterId } }
					);
				}
			}

			newJob.normalPlatformCommision = commisionWithoutPriority;
			newJob.priorityPlatformCommision = commisionWithPriority;

			if (newJob) {
				const skillModels = skills.map(item => {
					return {
						jobId: newJob.id,
						skillId: item.skillId,
						parentSkill: item.parentSkill || null
					};
				});
				//Insert Job Skills
				await JobSkills.bulkCreate(skillModels);
			}
			newJob.skills = skills;
			return newJob;
		} catch (error) {
			console.log(error);
			throw new Error(`User`);
		}
	},
	/**
	 * This function used to Update Job
	 * @author Didijobs <rgy713>
	 */
	updateJob: async (data, jobId, idUser) => {
		const { location, skills, price } = data;
		const updatedJob = await JobMaster.findByPk(jobId);
		if (!updatedJob) {
			throw new Error('Job not found');
		}
		// console.log('updatedJob', updatedJob);
		if (data && data.images) {
			data.images = images.join(',');
		}
		let priceValue = parseFloat(price);
		const res = await Settings.findOne({ where: { id: 1 } });
		const { platformCommision, priorityBasedCommision } = res.dataValues;
		let commisionWithoutPriority, commisionWithPriority;
		commisionWithoutPriority = (price * platformCommision) / 100;
		commisionWithPriority = (price * priorityBasedCommision) / 100;
		if (data.priorityPosting && data.priorityPosting === true) {
			data.platformCommisiƒons =
				commisionWithoutPriority + commisionWithPriority;
			data.totalPrice =
				priceValue + commisionWithoutPriority + commisionWithPriority;
		} else {
			data.priorityPosting = false;
			data.platformCommisions = commisionWithoutPriority;
			data.totalPrice = priceValue + commisionWithoutPriority;
		}
		const point = {
			type: 'Point',
			coordinates: [location.long, location.lat]
		};
		data.location = point;
		data.posterId = idUser;

		await JobMaster.update(data, {
			where: { id: jobId }
		});
		// const updatedJob = await JobMaster.findByPk(jobId);
		const removePrevSkill = await JobSkills.destroy({
			where: { jobId: jobId }
		});
		if (removePrevSkill) {
			const skillModels = skills.map(item => {
				return {
					jobId: jobId,
					skillId: item.skillId,
					parentSkill: item.parentSkill || null
				};
			});
			await JobSkills.bulkCreate(skillModels);
		}
		return true;
	},
	/**
	 * This function used to get all jobs of a user
	 * @author Didijobs <rgy713>
	 */
	getMyJobs: async idUser => {
		return await JobMaster.findAll({
			attributes: [
				'id',
				'posterId',
				'location',
				'price',
				'platformCommisions',
				'totalPrice',
				'images',
				'jobAddress',
				'priorityPosting',
				'toolsRequired',
				'description',
				'duration',
				'disputed',
				'disputeCode',
				'durationUnit',
				'currentLocation',
				'paymentMethod',
				'status',
				'createdAt'
			],
			where: {
				posterId: idUser,
				[Op.and]: [
					{
						status: {
							[Op.ne]: 'open'
						}
					},
					{
						status: {
							[Op.ne]: 'new'
						}
					}
				]
			}
		});
	},
	/**
	 * This function used to get user job whose status is 'open'
	 * @author Didijobs <rgy713>
	 */
	getCurrentJob: async idUser => {
		try {
			let jobSkills;
			var job = await JobMaster.findOne({
				attributes: [
					'id',
					'posterId',
					'location',
					'price',
					'platformCommisions',
					'totalPrice',
					'images',
					'jobAddress',
					'priorityPosting',
					'toolsRequired',
					'description',
					'paymentMethod',
					'currentLocation',
					'duration',
					'disputed',
					'disputeCode',
					'durationUnit',
					'status',
					'createdAt'
				],
				where: {
					posterId: idUser,
					[Op.or]: [
						{ status: 'open' },
						{ status: 'new' },
						{ status: 'in-progress' }
					]
				}
			});
			if (job) {
				const skills = await JobSkills.findAll({
					where: { jobId: job.id }
				});
				// const skill = skills.map(item => item.dataValues.skillId);
				// jobSkills = await SkillMaster.findAll({
				// 	attributes: ['id', 'title'],
				// 	where: { id: skill }
				// });
				job.dataValues.skills = skills;
			}

			return job;
		} catch (error) {
			console.log(error);
		}
	},

	/**
	 * This function used to Update Job Status
	 * @author Didijobs <rgy713>
	 */
	jobUpdateStatus: async (jobId, job) => {
		return await JobMaster.update(job, { where: { id: jobId } });
	},
	/**
	 * This function used to cancel a Job
	 * @author Didijobs <rgy713>
	 */
	cancelJob: async jobId => {
		const job = {};
		job.status = 'cancelled';
		return await JobMaster.update(job, { where: { id: jobId } });
	},
	/**
	 * This function used to complete a Job
	 * @author Didijobs <rgy713>
	 */
	completeJob: async jobId => {
		const job = {};
		job.status = 'completed';
		return await JobMaster.update(job, { where: { id: jobId } });
	},
	/**
	 * This function used to Delete Job
	 * @author Didijobs <rgy713>
	 */
	deleteJob: async jobId => {
		const job = {};
		job.status = 'deleted';
		return await JobMaster.update(job, { where: { id: jobId } });
	},
	/**
	 * This function used to Get All Jobs by location within radius
	 * @author Didijobs <rgy713>
	 */
	getAllJobs: async data => {
		const { lat, long } = data.location;
		const { radius } = data;
		const disKm = radius * 1.60934;
		const degree = disKm / 110.571;
		try {
			const location = sequelize.literal(
				`ST_GeomFromText('POINT(${long} ${lat})', 4326)`
			);
			const distance = Sequelize.fn(
				'ST_Distance',
				Sequelize.literal('location'),
				location
			);
			//Finding nearby jobs within radius
			return await JobMaster.findAll({
				attributes: [
					'id',
					[
						sequelize.fn(
							'ST_Distance',
							sequelize.literal('location'),
							location
						),
						'distance'
					],
					'location',
					'price',
					'platformCommisions',
					'priorityPosting',
					'toolsRequired',
					'description',
					'duration',
					'durationUnit',
					'jobAddress',
					'images'
					// 'skills'
				],
				where: Sequelize.where(distance, { [Op.lte]: degree }),
				order: [['location', 'ASC']],
				order: distance,
				limit: 10,
				logging: console.log
			});
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to insert User feedback
	 * @author Didijobs <rgy713>
	 */
	createUserReview: async review => {
		review.status = '1';
		try {
			if (review.images) {
				review.images = review.images.join(',');
			}
			const res = await UserReview.create(review);
			if (res) {
				return await UserReview.findOne({
					attributes: [
						'id',
						'idUser',
						'reviewerId',
						'ratings',
						'feedback',
						'images',
						'status'
					],
					where: { id: res.id }
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to get User Feedback
	 * @author Didijobs <rgy713>
	 */
	getUserReview: async (idUser, filter, userId) => {
		try {
			if (filter.result === 'positive') {
				return await UserReview.findAll({
					attributes: [
						'id',
						'idUser',
						'reviewerId',
						'ratings',
						'feedback',
						'images',
						'status',
						'createdAt'
					],
					order: [['createdAt', 'DESC']],
					where: {
						status: '1',
						idUser: idUser,
						ratings: { [Op.gte]: 4 }
						// createdAt: {
						// 	[Op.gte]: moment().subtract(7, 'days').toDate()
						// }
					}
				});
			} else if (filter.result === 'negative') {
				return await UserReview.findAll({
					attributes: [
						'id',
						'idUser',
						'reviewerId',
						'ratings',
						'feedback',
						'images',
						'status',
						'createdAt'
					],
					order: [['createdAt', 'DESC']],
					where: {
						status: '1',
						idUser: idUser,
						ratings: { [Op.lt]: 4 }
					}
				});
			} else {
				return await UserReview.findAll({
					attributes: [
						'id',
						'idUser',
						'reviewerId',
						'ratings',
						'feedback',
						'images',
						'status',
						'createdAt'
					],
					order: [['createdAt', 'DESC']],
					where: {
						status: '1',
						idUser: userId ? userId : idUser
						// createdAt: {
						// 	[Op.gte]: moment().subtract(7, 'days').toDate()
						// }
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to get single feedback detail
	 * @author Didijobs <rgy713>
	 */
	getUserReviewById: async reviewId => {
		return await UserReview.findOne({
			attributes: [
				'id',
				'idUser',
				'reviewerId',
				'ratings',
				'feedback',
				'images',
				'status'
			],
			where: { status: '1', id: reviewId }
		});
	},
	/**
	 * This function used to insert job application from service provider
	 * @author Didijobs <rgy713>
	 */
	createJobApplication: async jobApplication => {
		jobApplication.status = 'new';
		const application = await JobApplication.create(jobApplication);
		if (application) {
			return true;
		} else {
			false;
		}
	},
	/**
	 * This function used to Update Job application
	 * @author Didijobs <rgy713>
	 */
	updateJobApplication: async (jobApplication, jobApplicationId) => {
		let job = {};
		if (jobApplication.status === 'rejected') {
			job.status = 'rejected';
		} else if (jobApplication.status === 'cancelled') {
			job.status = 'cancelled';
		} else if (jobApplication.status === 'revoked') {
			job.status = 'revoked';
		} else if (jobApplication.status === 'deleted') {
			job.status = 'deleted';
		}
		const res = await JobApplication.update(job, {
			where: { id: jobApplicationId }
		});
		if (res) {
			return true;
		} else {
			return false;
		}
	},
	cancelJobApplication: async jobApplicationid => {
		return await JobApplication.update(
			{ status: 'canceled' },
			{ where: { id: jobApplicationid } }
		);
	},
	/**
	 * This function used to Accept Job Application from poster
	 * @author Didijobs <rgy713>
	 */
	acceptJobApplication: async (jobApplication, jobApplicationId) => {
		if (jobApplication.status === 'accepted') {
			await JobMaster.update(
				{ status: 'in-process' },
				{ where: { id: jobApplication.jobId } }
			);
		}
		const res = await JobApplication.update(jobApplication, {
			where: { id: jobApplicationId }
		});
		if (res) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * This function used to get Job application by Job ID
	 * @author Didijobs <rgy713>
	 */
	getJobApplicationById: async id => {
		const [results, metadata] = await sequelize.query(`SELECT *
				FROM tbl_kjobs_job_master
				LEFT JOIN tbl_kjobs_job_application ON tbl_kjobs_job_master.id = tbl_kjobs_job_application.job_id
				WHERE job_id = ${id}`);
		return results;
	},
	/**
	 * This function used to get Job application by User ID
	 * @author Didijobs <rgy713>
	 */
	getJobApplicationByUserID: async idUser => {
		const [
			results,
			metadata
		] = await sequelize.query(`SELECT tbl_kjobs_job_master.id, tbl_kjobs_job_master.poster_id,tbl_kjobs_job_master.location,tbl_kjobs_job_master.price,tbl_kjobs_job_master.platform_commision,tbl_kjobs_job_master.priority_posting,tbl_kjobs_job_master.tools_required,tbl_kjobs_job_master.description,tbl_kjobs_job_master.duration,tbl_kjobs_job_master.duration_unit,tbl_kjobs_job_master.status,tbl_kjobs_job_master.created_at as applyDate
			FROM tbl_kjobs_job_master
			LEFT JOIN tbl_kjobs_job_application ON tbl_kjobs_job_master.id = tbl_kjobs_job_application.job_id
			WHERE tbl_kjobs_job_application.applicant_id = ${idUser}`);
		return results;
	},
	/**
	 * This function used to Report Job
	 * @author Didijobs <rgy713>
	 */
	createJobReport: async report => {
		return await JobReport.create(report);
		// return await JobReport.findOne({ where: { id: res.id } });
	},
	getAllJobApplicants: async jobId => {
		const applicant = await JobApplication.findOne({
			where: { jobId: jobId, status: 'new' }
		});
		// console.log(applicant.id);
		let x = await Users.findOne({ where: { id: applicant.applicantId } });
		const userSkills = await UserSkills.findAll({
			where: { idUser: applicant.applicantId }
		});
		let skillIds = userSkills.map(item => item.skillId);
		let userReviews = await UserReview.findAll({
			where: { idUser: applicant.applicantId, status: 1 }
		});
		x.dataValues.userSkills = skillIds;
		x.dataValues.reviewCounts = userReviews.length;
		return x;
	},
	markJobDispute: async (jobId, dispute) => {
		dispute.disputed = 1;
		const res = await JobMaster.update(dispute, {
			where: { id: jobId }
		});
		if (res) {
			return await JobMaster.findOne({ where: { id: jobId } });
		}
	}
};
