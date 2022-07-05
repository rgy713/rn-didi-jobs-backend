const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;

const JobDispute = sequelize.define(
  "JobDispute",
  {
    jobDisputeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,

    },
    disputeText: {
      type: DataTypes.TEXT(),
      defaultValue: null,
    },
    // cancelDispute: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: false,
    // },
    deleted: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
    tableName: "tbl_kjobs_job_dispute",
  }
);

module.exports = JobDispute;
