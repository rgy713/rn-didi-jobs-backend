const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;

//creating a new chat room that will define each session of the chat between users
//chat room is like a many to many with users
//because the user can have many chat rooms and one chat room can belongs to the other user
//for solving this we will create another table that will handle the relationship
const ChatReport = sequelize.define(
  "ChatReport",
  {
    chatReportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //sender id and receiver id will be added
    //through the association
    reportText: {
      type: DataTypes.TEXT,
      defaultValue: null,
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
    freezeTableName: true,
    sequelize,
    tableName: "chatreport",
  }
);

module.exports = ChatReport;
