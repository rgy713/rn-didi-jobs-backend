const ChatRoomMessages = require('../models/chatRoomMessages');
const ChatRoom = require('../models/chatRooms');
const model = require('../models/user');
const { checkBadWord } = require('../helpers/chatDispute');
const JobDispute = require('../models/jobDispute');
const ChatReport = require('../models/chatMessageReport');

const { chatDisputeCount } = require('../helpers/chatDispute');
const messageServices = require('../services/messageServices');
const MessageHelper = require('../helpers/MessageHelper');
const HTTP_STATUS = require('../helpers/httpStatus');
const resParams = require('../config/params');

module.exports = {
	//send a messagee
	/**
	 * This function used to send message
	 * @author Didijobs <rgy713>
	 */
	sendMessage: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { chatRoomId, messageText } = req.body;
		try {
			params.data = await messageServices.sendMessage(
				idUser,
				request.body
			);
			if (params.data === false) {
				params.message = MessageHelper.BAD_WORDS;
				response.status(HTTP_STATUS.OK).send(params);
			} else if (params.data) {
				params.message = MessageHelper.MESSAGE_SENT;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		//Remove commented code after testing
		// if (!(userId, chatRoomId, messageText)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Sender and Chat Room id is required'
		// 	});
		// 	res.end();
		// 	return;
		// } else if (checkBadWord(messageText)) {
		// 	res.status(406)
		// 		.send({
		// 			status: 'Rejected',
		// 			message: 'Bad Words are no allowed'
		// 		})
		// 		.end();
		// 	return;
		// } else {
		// 	const addMessage = await ChatRoomMessages.create({
		// 		messageText,
		// 		chatRoomId,
		// 		idUser: userId
		// 	});

		// 	if (addMessage?.dataValues) {
		// 		//socket class will handle the sending message to the user

		// 		res.status(200).send({
		// 			status: 'Created',
		// 			message: 'Message Sent'
		// 		});
		// 		res.end();
		// 		return;
		// 	} else {
		// 		res.status(500).send({ status: 'Error', message: 'Try Again' });
		// 	}
		// }
	},
	/**
	 * This function used to reply a message
	 * @author Didijobs <rgy713>
	 */
	messageReply: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { chatRoomId, messageText, messageId } = request.body;
		try {
			params.data = await messageServices.messageReply(
				idUser,
				request.body
			);
			if (params.data === false) {
				params.message = MessageHelper.BAD_WORDS;
				response.status(HTTP_STATUS.OK).send(params);
			} else if (params.data) {
				params.message = MessageHelper.MESSAGE_SENT;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		// if (!(userId, chatRoomId, messageText)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Sender and Chat Room id is required'
		// 	});
		// 	res.end();
		// 	return;
		// } else if (checkBadWord(messageText)) {
		// 	res.status(406)
		// 		.send({
		// 			status: 'Rejected',
		// 			message: 'Bad Words are no allowed'
		// 		})
		// 		.end();
		// 	return;
		// } else {
		// 	const addMessage = await ChatRoomMessages.create({
		// 		parentid: messageId,
		// 		messageText,
		// 		chatRoomId,
		// 		idUser: userId
		// 	});

		// 	if (addMessage?.dataValues) {
		// 		//socket class will handle the sending message to the user
		// 		res.status(200).send({
		// 			status: 'Created',
		// 			message: 'Message Sent'
		// 		});
		// 		res.end();
		// 		return;
		// 	} else {
		// 		res.status(500).send({ status: 'Error', message: 'Try Again' });
		// 	}
		// }
	},
	/**
	 * This function used to Get User's conversation List
	 * @author Didijobs <rgy713>
	 */
	getConversationList: async (req, response) => {
		const params = { ...resParams };
		const { idUser } = req.user;
		try {
			params.data = await messageServices.getConversationList(idUser);
			if (params.data) {
				params.message = MessageHelper.USER_CONVERSATION_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Get message history
	 * @author Didijobs <rgy713>
	 */
	messageHistory: async (request, response) => {
		const params = { ...resParams };
		const { IdUser } = request.user;
		const receiverId = request.params.id;
		try {
			params.data = await messageServices.messageHistory(
				IdUser,
				receiverId
			);
			if (params.data) {
				params.message = MessageHelper.MESSAGE_HISTORY_FETCHED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
	},
	/**
	 * This function used to Pinned a Chat
	 * @author Didijobs <rgy713>
	 */
	pinnedChat: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { chatRoomId } = request.params.id;

		try {
			params.data = await messageServices.pinnedChat(idUser, chatRoomId);
			if (params.data?.[0]) {
				params.message = MessageHelper.CHAT_PINNED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		// if (!(chatRoomId, userId)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Invalid Id is mandatory'
		// 	});

		// 	res.end();
		// } else {
		// 	const pinnedChatStatus = await ChatRoom.update(
		// 		{
		// 			pinnedChat: true
		// 		},
		// 		{
		// 			where: {
		// 				chatRoomId,
		// 				idUser: userId
		// 			}
		// 		}
		// 	);
		// 	if (pinnedChatStatus?.[0]) {
		// 		res.status(200)
		// 			.send({ updated: true, status: 'Chat Pinned' })
		// 			.end();
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				updated: false,
		// 				status: 'Not updated',
		// 				message: 'Invalid Ids'
		// 			})
		// 			.end();
		// 	}
		// }
	},
	/**
	 * This function used to Unpinned a Chat
	 * @author Didijobs <rgy713>
	 */
	unPinnedChat: async (request, response) => {
		const params = { ...resParams };
		const { chatRoomId } = request.params.id;
		const { idUser } = request.user;
		try {
			params.data = await messageServices.unPinnedChat(
				idUser,
				chatRoomId
			);
			if (params.data?.[0]) {
				params.message = MessageHelper.CHAT_UNPINNED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(chatRoomId, userId)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Invalid Id is mandatory'
		// 	});

		// 	res.end();
		// } else {
		// 	console.log(req.body);
		// 	const unPinnedChatStatus = await ChatRoom.update(
		// 		{
		// 			pinnedChat: false
		// 		},
		// 		{
		// 			where: {
		// 				chatRoomId: 5,
		// 				idUser: 1 //userId
		// 			}
		// 		}
		// 	).catch(err => {
		// 		if (err) {
		// 			console.log(
		// 				'Error Updating Pinned Chat to Un Pinned Chat '
		// 			);
		// 			console.trace(err);
		// 			return null;
		// 		}
		// 	});
		// 	if (unPinnedChatStatus?.[0]) {
		// 		res.status(200)
		// 			.send({ updated: true, status: 'Chat Un Pinned' })
		// 			.end();
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				updated: false,
		// 				status: 'Not updated',
		// 				message: 'Invalid Ids'
		// 			})
		// 			.end();
		// 	}
		// }
	},
	/**
	 * This function used to delete a Chat
	 * @author Didijobs <rgy713>
	 */
	deleteChat: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const chatRoomId = request.params.id;
		try {
			params.data = await messageServices.deleteChat(idUser, chatRoomId);
			if (params.data) {
				params.message = MessageHelper.CHAT_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(chatRoomId, userId)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Invalid Id is mandatory'
		// 	});

		// 	res.end();
		// } else {
		// 	const chatDeletedStatus = await ChatRoom.update(
		// 		{
		// 			deletedChat: true
		// 		},
		// 		{
		// 			where: {
		// 				chatRoomId,
		// 				idUser: userId
		// 			}
		// 		}
		// 	);
		// 	if (chatDeletedStatus?.[0]) {
		// 		res.status(200)
		// 			.send({ updated: true, status: 'Chat Deleted' })
		// 			.end();
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				updated: false,
		// 				status: 'Not Deleted',
		// 				message: 'Invalid Ids'
		// 			})
		// 			.end();
		// 	}
		// }
	},
	/**
	 * This function used to delete multiple chat
	 * @author Didijobs <rgy713>
	 */
	deleteManyChat: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const chatRoomId = request.params.id;
		try {
			params.data = await messageServices.deleteManyChat(
				idUser,
				chatRoomId
			);
			if (params.data) {
				params.message = MessageHelper.MANY_CHAT_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(chatRoomId, userId)) {
		// 	res.status(400).send({
		// 		status: 'error',
		// 		message: 'Invalid Id is mandatory'
		// 	});

		// 	res.end();
		// } else {
		// 	const chatDeletedStatus = await ChatRoom.update(
		// 		{
		// 			deletedChat: true
		// 		},
		// 		{
		// 			where: {
		// 				chatRoomId,
		// 				idUser: userId
		// 			}
		// 		}
		// 	);
		// 	if (chatDeletedStatus?.[0]) {
		// 		res.status(200)
		// 			.send({ updated: true, status: 'Chat Deleted' })
		// 			.end();
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				updated: false,
		// 				status: 'Not Deleted',
		// 				message: 'Invalid Ids'
		// 			})
		// 			.end();
		// 	}
		// }
	},
	/**
	 * This function used to create job dispute
	 * @author Didijobs <rgy713>
	 */
	createJobDispute: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { jobId, disputeText } = request.body;
		try {
			params.data = await messageServices.createJobDispute(
				idUser,
				jobId,
				disputeText
			);
			if (params.data) {
				params.message = MessageHelper.JOB_DISPUTE_CREATED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(userId, jobId, disputeText)) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Ids are incorrect' })
		// 		.end();
		// 	return;
		// } else {
		// 	const checkDispute = await JobDispute.findAndCountAll({
		// 		where: {
		// 			jobId,
		// 			idUser: userId
		// 		}
		// 	}).catch(err => {
		// 		if (err) {
		// 			console.log('Error Finding Dispute Chat');
		// 			console.trace(err);
		// 			return null;
		// 		}
		// 	});
		// 	//if the dispute found then share the dispute information to the response
		// 	if (checkDispute?.count > chatDisputeCount) {
		// 		res.status(200)
		// 			.send({
		// 				newDispute: false,
		// 				status: 'found',
		// 				disputeMessage: `You have already have ${chatDisputeCount} disputes on this Job. You can not create more`
		// 			})
		// 			.end();
		// 		return;
		// 	}
		// 	//if the dispute is not present then create a new dispute
		// 	else {
		// 		const disputeCreated = await JobDispute.create({
		// 			jobId,
		// 			idUser: userId,
		// 			disputeText
		// 		}).catch(err => {
		// 			if (err) {
		// 				console.log(
		// 					'Error Updating Pinned Chat to Un Pinned Chat '
		// 				);
		// 				console.trace(err);
		// 				return null;
		// 			}
		// 		});

		// 		if (disputeCreated?.dataValues) {
		// 			res.status(200)
		// 				.send({
		// 					newDispute: true,
		// 					status: 'created',
		// 					dispute: disputeCreated
		// 				})
		// 				.end();
		// 			return;
		// 		} else {
		// 			res.status(500)
		// 				.send({
		// 					status: 'error',
		// 					dispute: []
		// 				})
		// 				.end();
		// 			return;
		// 		}
		// 	}
		// }
	},
	/**
	 * This function used to view job dispute
	 * @author Didijobs <rgy713>
	 */
	viewJobDispute: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		try {
			params.data = await messageServices.viewJobDispute(idUser);
			if (params.data) {
				params.message = MessageHelper.VIEW_JOB_DISPUTE;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		// if (!idUser) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Id are incorrect' })
		// 		.end();
		// 	return;
		// } else {
		// 	const usesrDisputes = await JobDispute.findAll({
		// 		where: {
		// 			idUser: idUser
		// 		}
		// 	}).catch(err => {
		// 		if (err) {
		// 			console.log(
		// 				'Error Updating Pinned Chat to Un Pinned Chat '
		// 			);
		// 			console.trace(err);
		// 			return null;
		// 		}
		// 	});

		// 	//if the dispute found then share the dispute information to the response
		// 	if (usesrDisputes.length > 0) {
		// 		res.status(200)
		// 			.send({
		// 				status: 'found',
		// 				disputes: usesrDisputes
		// 			})
		// 			.end();
		// 		return;
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				status: 'not found',
		// 				disputes: []
		// 			})
		// 			.end();
		// 		return;
		// 	}
		// }
	},
	/**
	 * This function used to cancel job dispute
	 * @author Didijobs <rgy713>
	 */
	cancelDispute: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { jobId, jobDisputeId } = request.body;
		try {
			params.data = await messageServices.cancelDispute(
				idUser,
				jobId,
				jobDisputeId
			);
			if (params.data) {
				params.message = MessageHelper.CHAT_DISPUTE_CANCEL;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(userId, jobId, jobDisputeId)) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Id are incorrect' })
		// 		.end();
		// 	return;
		// } else {
		// 	const cancelDisputeStatus = await JobDispute.update(
		// 		{
		// 			deleted: true
		// 		},
		// 		{
		// 			where: {
		// 				idUser: userId,
		// 				jobId,
		// 				jobDisputeId
		// 			}
		// 		}
		// 	);

		// 	//checking the message is updated or not
		// 	if (cancelDisputeStatus?.[0]) {
		// 		res.status(200).send({
		// 			status: 'Cancelled',
		// 			message: 'Dispute is Cancelled'
		// 		});
		// 		res.end();
		// 		return;
		// 	} else {
		// 		res.status(200).send({
		// 			status: 'Not Cancelled',
		// 			message: 'Dispute is not Cancelled'
		// 		});
		// 		res.end();
		// 		return;
		// 	}
		// }
	},
	/**
	 * This function used to create chat report
	 * @author Didijobs <rgy713>
	 */
	createChatReport: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const data = request.body;
		try {
			params.data = await messageServices.createChatReport(idUser, data);
			if (params.data) {
				params.message = MessageHelper.CREATE_CHAT_REPORT;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			console.log(error);
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		// if (!(userId, reportText, chatRoomMessagesId)) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Id are incorrect' })
		// 		.end();
		// 	return;
		// } else {
		// 	const reportChatCreated = await ChatReport.create({
		// 		chatRoomMessagesId,
		// 		idUser: userId,
		// 		reportText
		// 	}).catch(err => {
		// 		if (err) {
		// 			console.log('Error Creating Chat Report ');
		// 			console.trace(err);
		// 			return null;
		// 		}
		// 	});

		// 	if (reportChatCreated?.dataValues) {
		// 		res.status(200)
		// 			.send({
		// 				newReport: true,
		// 				status: 'created',
		// 				report: reportChatCreated
		// 			})
		// 			.end();
		// 		return;
		// 	} else {
		// 		res.status(500)
		// 			.send({
		// 				status: 'error',
		// 				report: []
		// 			})
		// 			.end();
		// 		return;
		// 	}
		// }
	},
	/**
	 * This function used to mark message read
	 * @author Didijobs <rgy713>
	 */
	markAsReadMessage: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const chatRoomId = req.params.id;
		try {
			params.data = await messageServices.markAsReadMessage(chatRoomId);
			if (params.data) {
				params.message = MessageHelper.MESSAGE_READ_MARKED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			response.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}
		// if (!chatRoomId) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Ids are incorrect' })
		// 		.end();
		// 	return;
		// } else {
		// 	const readAllMessages = await ChatRoomMessages.update(
		// 		{
		// 			isRead: true
		// 		},
		// 		{
		// 			where: {
		// 				chatRoomId
		// 			}
		// 		}
		// 	);

		// 	if (readAllMessages?.[0]) {
		// 		res.status(200)
		// 			.send({ updated: true, status: 'Chat Marked as Read' })
		// 			.end();
		// 	} else {
		// 		res.status(200)
		// 			.send({
		// 				updated: false,
		// 				status: 'Not Read',
		// 				message: 'Invalid Ids'
		// 			})
		// 			.end();
		// 	}
		// }
	},
	/**
	 * This function used to edit message
	 * @author Didijobs <rgy713>
	 */
	editMessage: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { chatRoomId, chatRoomMessagesId, messageText } = req.body;
		try {
			params.data = await messageServices.editMessage(
				idUser,
				request.body
			);
			if (params.data === false) {
				params.message = MessageHelper.BAD_WORDS;
				response.status(HTTP_STATUS.OK).send(params);
			} else if (params.data) {
				params.message = MessageHelper.MESSAGE_EDITED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// if (!(userId, chatRoomId, chatRoomMessagesId, messageText)) {
		// 	res.status(400)
		// 		.send({ status: 'Bad Request', message: 'Id are incorrect' })
		// 		.end();
		// 	return;
		// } else if (checkBadWord(messageText)) {
		// 	res.status(406)
		// 		.send({
		// 			status: 'Rejected',
		// 			message: 'Bad Words are no allowed'
		// 		})
		// 		.end();
		// 	return;
		// } else {
		// 	const editMessage = await ChatRoomMessages.update(
		// 		{
		// 			messageText
		// 		},
		// 		{
		// 			where: {
		// 				idUser: userId,
		// 				chatRoomId,
		// 				chatRoomMessagesId,
		// 				isRead: false //adding false to make sure that the message is still unread
		// 			}
		// 		}
		// 	);

		// 	//checking the message is updated or not
		// 	if (editMessage?.[0]) {
		// 		res.status(200).send({
		// 			status: 'Edited',
		// 			message: 'Message Edited'
		// 		});
		// 		res.end();
		// 		return;
		// 	} else {
		// 		res.status(200).send({
		// 			status: 'Not Edited',
		// 			message: 'Message not Edited'
		// 		});
		// 		res.end();
		// 		return;
		// 	}
		// }
	},
	/**
	 * This function used to delete a message
	 * @author Didijobs <rgy713>
	 */
	deleteMessage: async (request, response) => {
		const params = { ...resParams };
		const { idUser } = request.user;
		const { chatRoomId, chatRoomMessagesId } = req.body;
		try {
			params.data = await messageServices.deleteMessage(
				idUser,
				request.body
			);
			if (params.data) {
				params.message = MessageHelper.MESSAGE_DELETED;
				response.status(HTTP_STATUS.OK).send(params);
			}
		} catch (error) {
			params.data = error;
			params.message = error.message;
			response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(params);
		}

		// 	if (!(userId, chatRoomId, chatRoomMessagesId)) {
		// 		res.status(400)
		// 			.send({ status: 'Bad Request', message: 'Id are incorrect' })
		// 			.end();
		// 		return;
		// 	} else {
		// 		const editMessage = await ChatRoomMessages.update(
		// 			{
		// 				deleted: true
		// 			},
		// 			{
		// 				where: {
		// 					idUser: userId,
		// 					chatRoomId,
		// 					chatRoomMessagesId
		// 				}
		// 			}
		// 		);

		// 		//checking the message is updated or not
		// 		if (editMessage?.[0]) {
		// 			res.status(200).send({
		// 				status: 'Deleted',
		// 				message: 'Message Deleted'
		// 			});
		// 			res.end();
		// 			return;
		// 		} else {
		// 			res.status(200).send({
		// 				status: 'Not Deleted',
		// 				message: 'Message not Deleted'
		// 			});
		// 			res.end();
		// 			return;
		// 		}
		// 	}
	}
};

// global.io.printAllClients();

// JobDispute.sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {});
