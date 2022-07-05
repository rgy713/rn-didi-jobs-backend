module.exports = {
	createJobDispute: {
		jobId: {
			isLength: {
				errorMessage: 'job id is required',
				options: { min: 1 }
			}
		},
		disputeText: {
			isLength: {
				errorMessage: 'dispute text is required',
				options: { min: 3 }
			}
		}
	},
	cancelDispute: {
		jobId: {
			isLength: {
				errorMessage: 'job id is required',
				options: { min: 1 }
			}
		},
		jobDisputeId: {
			isLength: {
				errorMessage: 'jobDisputeId  is required',
				options: { min: 1 }
			}
		}
	},
	createChatReport: {
		reportText: {
			isLength: {
				errorMessage: 'reportText is required',
				options: { min: 1 }
			}
		},
		chatRoomMessagesId: {
			isLength: {
				errorMessage: 'chatRoomMessagesId  is required',
				options: { min: 1 }
			}
		}
	},
	deleteMessage: {
		chatRoomMessagesId: {
			isLength: {
				errorMessage: 'chatRoomMessagesId is required',
				options: { min: 1 }
			}
		},
		chatRoomId: {
			isLength: {
				errorMessage: 'chatRoomId  is required',
				options: { min: 1 }
			}
		}
	},
	editMessage: {
		chatRoomMessagesId: {
			isLength: {
				errorMessage: 'chatRoomMessagesId is required',
				options: { min: 1 }
			}
		},
		chatRoomId: {
			isLength: {
				errorMessage: 'chatRoomId  is required',
				options: { min: 1 }
			}
		},
		messageText: {
			isLength: {
				errorMessage: 'messageText  is required',
				options: { min: 1 }
			}
		}
	},
	messageReply: {
		messageId: {
			isLength: {
				errorMessage: 'messageId is required',
				options: { min: 1 }
			}
		},
		chatRoomId: {
			isLength: {
				errorMessage: 'chatRoomId  is required',
				options: { min: 1 }
			}
		},
		messageText: {
			isLength: {
				errorMessage: 'messageText  is required',
				options: { min: 1 }
			}
		}
	},
	sendMessage: {
		chatRoomId: {
			isLength: {
				errorMessage: 'chatRoomId  is required',
				options: { min: 1 }
			}
		},
		messageText: {
			isLength: {
				errorMessage: 'messageText  is required',
				options: { min: 1 }
			}
		}
	}
};
