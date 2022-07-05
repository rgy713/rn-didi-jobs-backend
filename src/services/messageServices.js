const User = require('../models/user');
const ChatRoom = require('../models/chatRooms');
const { checkBadWord } = require('../helpers/chatDispute');
const ChatRoomMessages = require('../models/chatRoomMessages');
const ChatReport = require('../models/chatMessageReport');
const JobDispute = require('../models/jobDispute');
module.exports = {
	/**
	 * This function used to Get User's conversation List
	 * @author Didijobs <rgy713>
	 */
	getConversationList: async idUser => {
		try {
			return await User.findAll({
				attributes: ['firstName', 'lastName'],
				include: {
					model: User,
					attributes: ['firstName', 'lastName'],
					required: true,
					as: 'receiver',
					through: {
						model: ChatRoom,
						attributes: [
							'chatRoomId',
							'receiverIdUser',
							'idUser',

							'pinnedChat'
						],
						where: {
							idUser: idUser,
							deletedChat: false
						}
					}
				},
				where: {
					idUser: idUser
				}
			});
		} catch (error) {
			console.log(error);
		}
	},
	//first we are checking that
	//user have chat with the receiver ever
	//if the user have talked with receiver than donot create a new chat room
	//else they both are new create a new chat room
	messageHistory: async (idUser, receiverId) => {
		try {
			return await ChatRoom.findAll({
				include: {
					model: ChatRoomMessages,
					required: true,
					where: {
						deleted: false
					}
				},
				where: {
					idUser: idUser,
					receiverIdUser: receiverId
				}
			});
		} catch (error) {
			console.log(error);
		}

		// 	.then(async result => {
		// 		if (result) return result;
		// 		else return null;
		// 	})
		// 	.catch(err => {
		// 		if (err) {
		// 			console.log('Error in Messaging Start Chatting API');
		// 			console.trace(err);
		// 			return null;
		// 		}
		// 	});
		// if (conversations.length > 0) {
		// 	res.status(200).send({
		// 		status: 'Found',
		// 		newChat: false,
		// 		data: conversations
		// 	});
		// 	res.end();
		// } else {
		// 	res.status(200).send({
		// 		status: 'Not Found',
		// 		newChat: false,
		// 		data: null
		// 	});
		// 	res.end();
		// }
	},
	/**
	 * This function used to Pinned a Chat
	 * @author Didijobs <rgy713>
	 */
	pinnedChat: async (idUser, chatRoomId) => {
		return await ChatRoom.update(
			{
				pinnedChat: true
			},
			{
				where: {
					chatRoomId,
					idUser: idUser
				}
			}
		);
	},
	/**
	 * This function used to Unpinned a Chat
	 * @author Didijobs <rgy713>
	 */
	unPinnedChat: async (idUser, chatRoomId) => {
		return await ChatRoom.update(
			{
				pinnedChat: false
			},
			{
				where: {
					chatRoomId: chatRoomId,
					idUser: idUser
				}
			}
		);
	},
	/**
	 * This function used to delete a Chat
	 * @author Didijobs <rgy713>
	 */
	deleteChat: async (idUser, chatRoomId) => {
		return await ChatRoom.update(
			{
				deletedChat: true
			},
			{
				where: {
					chatRoomId,
					idUser: idUser
				}
			}
		);
	},
	/**
	 * This function used to delete multiple chat
	 * @author Didijobs <rgy713>
	 */
	deleteManyChat: async (idUser, chatRoomId) => {
		const del = await ChatRoom.update(
			{
				deletedChat: true
			},
			{
				where: {
					chatRoomId,
					idUser: idUser
				}
			}
		);
		if (del) {
			await ChatRoomMessages.update(
				{
					deleted: true
				},
				{ where: { chatRoomId: chatRoomId } }
			);
		}
		return del;
	},
	/**
	 * This function used to create job dispute
	 * @author Didijobs <rgy713>
	 */
	createJobDispute: async (idUser, jobId, disputeText) => {
		try {
			const checkDispute = await JobDispute.findAndCountAll({
				where: {
					jobId,
					idUser: idUser
				}
			});
			if (checkDispute.count > 0) {
				return checkDispute.rows;
			} else {
				const disputeCreated = await JobDispute.create({
					jobId,
					idUser: idUser,
					disputeText
				});

				if (disputeCreated?.dataValues) {
					return disputeCreated;
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to view job dispute
	 * @author Didijobs <rgy713>
	 */
	viewJobDispute: async idUser => {
		return await JobDispute.findAll({
			where: {
				idUser: idUser
			}
		});
	},
	/**
	 * This function used to cancel job dispute
	 * @author Didijobs <rgy713>
	 */
	cancelDispute: async (idUser, jobId, jobDisputeId) => {
		return await JobDispute.update(
			{
				deleted: true
			},
			{
				where: {
					idUser: userId,
					jobId,
					jobDisputeId
				}
			}
		);
	},
	/**
	 * This function used to create chat report
	 * @author Didijobs <rgy713>
	 */
	createChatReport: async (idUser, data) => {
		const { reportText, chatRoomMessagesId } = data;
		return await ChatReport.create({
			chatRoomMessagesId,
			idUser: idUser,
			reportText
		}).catch(err => {
			if (err) {
				console.log('Error Creating Chat Report ');
				console.trace(err);
				return null;
			}
		});
	},
	/**
	 * This function used to mark message read
	 * @author Didijobs <rgy713>
	 */
	markAsReadMessage: async chatRoomId => {
		return await ChatRoomMessages.update(
			{
				isRead: true
			},
			{
				where: {
					chatRoomId
				}
			}
		);
	},
	/**
	 * This function used to mark message read
	 * @author Didijobs <rgy713>
	 */
	sendMessage: async (idUser, data) => {
		try {
			const { chatRoomId, messageText } = data;
			if (checkBadWord(messageText)) {
				return false;
			} else {
				return await ChatRoomMessages.create({
					messageText,
					chatRoomId,
					idUser: idUser
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to reply a message
	 * @author Didijobs <rgy713>
	 */
	messageReply: async (idUser, data) => {
		const { chatRoomId, messageText, messageId } = data;
		if (checkBadWord(messageText)) {
			return false;
		} else {
			return await ChatRoomMessages.create({
				parentid: messageId,
				messageText,
				chatRoomId,
				idUser: idUser
			});
		}
	},
	/**
	 * This function used to edit a messageText
	 * @author Didijobs <rgy713>
	 */
	editMessage: async (idUser, data) => {
		const { chatRoomId, chatRoomMessagesId, messageText } = data;
		if (checkBadWord(messageText)) {
			return false;
		} else {
			return await ChatRoomMessages.update(
				{
					messageText
				},
				{
					where: {
						idUser: idUser,
						chatRoomId,
						chatRoomMessagesId,
						isRead: false //adding false to make sure that the message is still unread
					}
				}
			);
		}
	},
	/**
	 * This function used to delete a messageText
	 * @author Didijobs <rgy713>
	 */
	deleteMessage: async (idUser, data) => {
		const { chatRoomId, chatRoomMessagesId } = data;
		return await ChatRoomMessages.update(
			{
				deleted: true
			},
			{
				where: {
					idUser: idUser,
					chatRoomId,
					chatRoomMessagesId,
					deleted: false
				}
			}
		);
	},
	createChatRoom: async (idUser, receiverId) => {
		return await ChatRoom.create({
			idUser: idUser,
			receiverIdUser: receiverId
		});
	}
};
