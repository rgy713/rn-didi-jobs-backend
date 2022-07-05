const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
const ChatRoomMessages = require('./chatRoomMessages');
const JobDispute = require('./jobDispute');

//creating a new chat room that will define each session of the chat between users
//chat room is like a many to many with users
//because the user can have many chat rooms and one chat room can belongs to the other user
//for solving this we will create another table that will handle the relationship
const ChatRoom = sequelize.define(
	'ChatRoom',
	{
		chatRoomId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		//sender id and receiver id will be added
		idUser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null
		},
		receiverIdUser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null
		},
		//through the association
		pinnedChat: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		deletedChat: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: 'chatroom'
	}
);

ChatRoom.hasMany(ChatRoomMessages, {
	foreignKey: 'chatRoomId',
	sourceKey: 'chatRoomId'
});

module.exports = ChatRoom;
