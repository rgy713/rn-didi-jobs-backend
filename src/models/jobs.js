const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;
const JobDispute = require("./jobDispute");

const Jobs = sequelize.define(
  "Jobs",
  {
    jobId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
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
    modelName: "Jobs",
    tableName: "tbl_kjobs_jobs",
    freezeTableName: true,
  }
);

Jobs.hasMany(JobDispute, {
  foreignKey: "jobId",
  sourceKey: "jobId",
});

// JobDispute.sync({ force: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = Jobs;
