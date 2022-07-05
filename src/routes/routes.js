const router = require('express').Router();
const { checkSchema } = require('express-validator');
const API_SCHEMA = require('../validator/apiSchema');
const USER_SCHEMA = require('../validator/userSchema');
const BANK_SCHEMA = require('../validator/bankSchema');
const SKILL_SCHEMA = require('../validator/skillSchema');
const DEVICE_TOKEN_SCHEMA = require('../validator/deviceTokenSchema');
const NOTIFICATION_SCHEMA = require('../validator/notification');
const JOB_SCHEMA = require('../validator/jobSchema');
const JOB_APPLICATION_SCHEMA = require('../validator/jobApplicationSchema');
const USER_REVIEW_SCHEMA = require('../validator/userReviewSchema');
const MESSAGE_SCHEMA = require('../validator/messageSchema');
const UTILITY_SCHEMA = require('../validator/utilitySchema');
const CARD_SCHEMA = require('../validator/cardSchema');
//controllers
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const UtilityController = require('../controllers/UtilityController');
const FAQController = require('../controllers/FAQController');
const NotificationController = require('../controllers/NotificationController');
const JobController = require('../controllers/JobController');
const CardController = require('../controllers/CardController');
const PaymentController = require('../controllers/PaymentController');
// function validate(req, res, next) {
// 	const err = await errorHelper.checkError(request);
// 	if (err) {
// 		params.message = err;
// 		return response.status(HTTP_STATUS.NOT_ACCEPTED).send(params);
// 	} else {
// 		next();
// 	}
// }

//messaging controller

const {
	getConversationList,
	messageHistory,
	pinnedChat,
	unPinnedChat,
	deleteChat,
	deleteManyChat,
	createJobDispute,
	viewJobDispute,
	cancelDispute,
	createChatReport,
	markAsReadMessage,
	sendMessage,
	messageReply,
	editMessage,
	deleteMessage,
	createChatRoom
} = require('../controllers/Messaging');
//Auth controller API's
router.post(
	'/auth/register',
	checkSchema(API_SCHEMA.registerUser),
	AuthController.register
);
router.post(
	'/auth/verify-email',
	checkSchema(API_SCHEMA.verifyEmail),
	AuthController.verifyOtp
);
router.post(
	'/auth/verify-mobile',
	checkSchema(API_SCHEMA.verifyMobile),
	AuthController.verifyMobileOtp
);
router.post('/auth/login', checkSchema(API_SCHEMA.login), AuthController.login);

router.post(
	'/auth/generate-otp',
	checkSchema(API_SCHEMA.generateOtp),
	AuthController.generateOtp
);
// router.post(
// 	'/auth/verify-email-otp',
// 	checkSchema(API_SCHEMA.verifyOtp),
// 	AuthController.verifyOtp
// );
// router.post(
// 	'/auth/register',
// 	checkSchema(API_SCHEMA.registerUser),
// 	AuthController.register
// );
// router.post(
// 	'/auth/verify-email',
// 	checkSchema(API_SCHEMA.verifyEmail),
// 	AuthController.verifyOtp
// );
// router.post('/auth/login', checkSchema(API_SCHEMA.login), AuthController.login);

// router.post(
// 	'/auth/generate-otp',
// 	checkSchema(API_SCHEMA.generateOtp),
// 	AuthController.generateOtp
// );
// router.post(
// 	'/auth/verify-otp',
// 	checkSchema(API_SCHEMA.verifyOtp),
// 	AuthController.verifyOtp
// );

//User profile API's
router.delete('/user/delete', UserController.deleteUser);
router.put('/user/update-profile', UserController.updateProfile);
router.get('/user/get-user-profile', UserController.getProfile);
router.put(
	'/user/update-notification-status',
	checkSchema(USER_SCHEMA.updateNotificationStatus),
	UserController.updateUserNotificationStatus
);
//get Service Providers and Job Poster Counts
router.get(
	'/user/service-provider-counts',
	UserController.getServiceProviderCount
);
router.get('/user/job-poster-counts', UserController.getJobPosterCount);
//Bank Account API's
router.post(
	'/user/add-bank',
	checkSchema(BANK_SCHEMA.addBank),
	UserController.addUserBankAccount
);
router.put(
	'/user/update-bank/:id',
	checkSchema(BANK_SCHEMA.updateBank),
	UserController.updateUserBankAccount
);
router.delete(
	'/user/delete-bank/:id',
	checkSchema(BANK_SCHEMA.deleteBankAccount),
	UserController.deleteUserBankAccount
);
router.get('/user/get-bank-accounts', UserController.getUserBankAccount);
router.get('/user/get-bank-account/:id', UserController.getUserBankAccountById);
// router.get('/common/get-bank-accounts', UserController.getBankAccount);
router.put(
	'/user/set-default-bank/:id',
	checkSchema(BANK_SCHEMA.setDefaultBank),
	UserController.setDefaultBankAccount
);

//Skill API's
router.post(
	'/user/add-skills',
	checkSchema(SKILL_SCHEMA.addSkill),
	UserController.addUserSkills
);
router.put(
	'/user/update-skill',
	checkSchema(SKILL_SCHEMA.addUserSkill),
	UserController.updateUserSkill
);
router.get('/user/get-skill', UserController.getUserSkill);

//Get All Skills API
router.get('/common/get-skill', UserController.getAllSkill);

//Device Toke API's'
router.put(
	'/user/update-device-token',
	checkSchema(DEVICE_TOKEN_SCHEMA.updateDeviceToken),
	UserController.updateDeviceToken
);
router.delete('/user/delete-device-token/:id', UserController.deleteUserToken);
router.get('/common/get-faqs', FAQController.getFAQs);

//Notification API's'
router.get('/notification/get-all', NotificationController.getNotifications);
router.put(
	'/notification/update/:id',
	NotificationController.updateNotification
);

router.delete(
	'/notification/delete',
	checkSchema(NOTIFICATION_SCHEMA.deleteNotification),
	NotificationController.deleteNotification
);

//job API's
router.post(
	'/job/create',
	checkSchema(JOB_SCHEMA.createJob),
	JobController.createJob
);
router.get(
	'/job/get-all',
	checkSchema(JOB_SCHEMA.getAllJobs),
	JobController.getAllJobs
);
router.put(
	'/job/update/:id',
	checkSchema(JOB_SCHEMA.updateJob),
	JobController.updateJob
);
router.get('/job/get/:id', JobController.getMyJobs);
router.get('/job/get-current-job', JobController.getCurrentJob);
router.put('/job/cancel/:id', JobController.cancelJob);
router.put('/job/complete/:id', JobController.completeJob);
router.put(
	'/job/update-status/:id',
	checkSchema(JOB_SCHEMA.updateStatus),
	JobController.jobUpdateStatus
);
router.delete('/job/delete/:id', JobController.deleteJob);

//job Application API's'
router.post(
	'/job/application/create',
	checkSchema(JOB_APPLICATION_SCHEMA.createJobApplication),
	JobController.createJobApplication
);
router.put(
	'/job/application/update/:id',
	checkSchema(JOB_APPLICATION_SCHEMA.updateJobApplicationStatus),
	JobController.updateJobApplication
);
router.put('/job/application/cancel/:id', JobController.cancelJobApplication);
router.put(
	'/job/application/accept/:id',
	checkSchema(JOB_APPLICATION_SCHEMA.updateJobApplicationStatus),
	JobController.acceptJobApplication
);
router.get('/job/get/applicant/:id', JobController.getAllJobApplications);
// router.get('/job/application/get', JobController.getAllJobApplication);
// router.get('/job/application/get/:id', JobController.getJobApplicationById);
router.get(
	'/job/application/get-by-user-id/:id',
	JobController.getJobApplicationByUserID
);
router.post('/job/report', JobController.createJobReport);

//user Review API's'
router.post(
	'/user/review/create',
	checkSchema(USER_REVIEW_SCHEMA.createUserReview),
	JobController.createUserReview
);
router.get('/user/review/get/:userId', JobController.getUserReview);
router.get('/user/review/get/:id', JobController.getUserReviewById);

//Upload file API's
router.post('/utility/upload-file', UtilityController.uploadFile);

//Upload file with image resize API's
router.post(
	'/utility/upload-image-with-resize',
	UtilityController.uploadImageWithResize
);
//create app feedback Api
router.post(
	'/feedback',
	// checkSchema(UTILITY_SCHEMA.createFeedback),
	UtilityController.createFeedback
);

//Card API's'
router.post(
	'/card/add',
	checkSchema(CARD_SCHEMA.addCard),
	CardController.addCard
);
router.get('/card/get', CardController.getUserCards);
router.put(
	'/card/update/:id',
	checkSchema(CARD_SCHEMA.updateCard),
	CardController.updateCard
);
router.put('/card/set-default/:id', CardController.setDefaultCard);
router.delete('/card/delete/:id', CardController.deleteCard);
router.get('/card/get/default', CardController.getDefaultCard);

//Payment API's'
router.post('/payment/generate/token', PaymentController.generatePaymentToken);
router.put('/payment/update/:id', PaymentController.updatePaymentStatus);
router.put('/payment/confirm/:id', PaymentController.confirmPayment);

//dispute Api
router.put('/job/mark-dispute/:id', JobController.markJobDispute);

/**
 * Implementating the messages here
 * Here is the route on which the user will be able to view
 * the list of people whom the user have talked.
 */

router
	.post('/messaging/chat-room/create/:id', createChatRoom)
	.get('/messaging/view-list', getConversationList)
	.get('/messaging/message-history/:id', messageHistory) //review
	.put('/messaging/pinned-chat/:id', pinnedChat)
	.put('/messaging/unpinned-chat/:id', unPinnedChat)
	.put('/messaging/delete-chat/:id', deleteChat)
	.put('/messaging/delete-many-chat/:id', deleteManyChat)
	.post(
		'/messaging/create-job-dispute',
		checkSchema(MESSAGE_SCHEMA.createJobDispute),
		createJobDispute
	) //review
	.get('/messaging/view-job-dispute', viewJobDispute)
	.put(
		'/messaging/cancel-dispute',
		checkSchema(MESSAGE_SCHEMA.cancelDispute),
		cancelDispute
	)
	.post(
		'/messaging/create-chat-report',
		checkSchema(MESSAGE_SCHEMA.createChatReport),
		createChatReport
	)
	.put('/messaging/mark-as-read-message/:id', markAsReadMessage)
	.post(
		'/messaging/send-message',
		checkSchema(MESSAGE_SCHEMA.sendMessage),
		sendMessage
	)
	.post(
		'/messaging/message-reply',
		checkSchema(MESSAGE_SCHEMA.messageReply),
		messageReply
	)
	.put(
		'/messaging/edit-message',
		checkSchema(MESSAGE_SCHEMA.editMessage),
		editMessage
	)
	.delete(
		'/messaging/delete-message',
		checkSchema(MESSAGE_SCHEMA.deleteMessage),
		deleteMessage
	);

module.exports = router;

// ChatReport.sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
