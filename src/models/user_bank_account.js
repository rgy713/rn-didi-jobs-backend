const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").MAIN_DATABASE;
const User = require("./user")
const attributes = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    // defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: "Primary Key",
    field: "id",
  },
  idUser: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    comment: null,
    field: "user_id",
    references: {
			model: User,
			key: 'idUser'
		}
  },
  accountHolderName: {
    type: DataTypes.STRING(256),
    allowNull: true,
    defaultValue: null,
    field: "account_holder_name",
  },
  accountNumber: {
    type: DataTypes.STRING(256),
    allowNull: true,
    defaultValue: "1",
    field: "account_number",
  },
  bankName: {
    type: DataTypes.STRING(256),
    allowNull: true,
    defaultValue: "1",
    field: "bank_name",
  },
  securityCode: {
    type: DataTypes.TEXT(),
    allowNull: true,
    defaultValue: "1",
    field: "security_code",
  },
  status: {
    type: DataTypes.ENUM("1", "0"),
    allowNull: false,
    defaultValue: "1",
    field: "status",
  },
  isDefault: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: "1",
    field: "default",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    autoIncrement: false,
    comment: null,
    field: "created_at",
  },
};

const options = {
  tableName: "tbl_kjobs_user_bank_accounts",
  timestamps: false,
  comment: "",
  indexes: [],
};

const model = sequelize.define("userBankModel", attributes, options);
module.exports = model;
