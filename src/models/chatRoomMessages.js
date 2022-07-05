const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;
const ChatReport = require("./chatMessageReport");

//here is the associate table where the user to usesr and chat room id will be stored

const ChatRoomMessages = sequelize.define(
  "chatroommessages",
  {
    chatRoomMessagesId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "chatroommessages",
    modelName: "ChatRoomMessages",
  }
);

ChatRoomMessages.belongsTo(ChatRoomMessages, {
  as: "parent",
  foreignKey: "parentid",
  sourceKey: "parentid",
});

ChatRoomMessages.hasMany(ChatReport, {
  foreignKey: "chatRoomMessagesId",
  sourceKey: "chatRoomMessagesId",
});

module.exports = ChatRoomMessages;
