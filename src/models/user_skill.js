const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;
const Skill = require("./skill_master");
const User = require("./user");
const attributes = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: "Primary Key",
    field: "id",
  },
  skillId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    comment: null,
    field: "skill_id",
    references: {
      model: "skillMaster",
      key: "skill_id",
    },
  },
  idUser: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    comment: null,
    field: "user_id",
    references: {
      model: "userModel",
      key: "user_id",
    },
  },
};

const options = {
  tableName: "tbl_kjobs_user_skill",
  timestamps: false,
  comment: "",
  indexes: [],
};

const model = sequelize.define("userSkillModel", attributes, options);

// Skill.belongsToMany(User, { through: model });

module.exports = model;
