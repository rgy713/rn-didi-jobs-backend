const { data } = require('../config/params');
const User = require('../models/user');
const UserBankAccount = require('../models/user_bank_account');

module.exports = {
	/**
	 * This function used to Add Bank accounts
	 * @author Didijobs <rgy713>
	 */
	addBank: async (data, idUser) => {
		data.idUser = idUser;
		const attributes = [
			'id',
			'idUser',
			'accountHolderName',
			'accountNumber',
			'bankName',
			'securityCode',
			'isDefault',
			'status'
		];
		const user = await User.findOne({ where: { idUser } });
		const { profileStatus } = user.dataValues;
		const acc = await UserBankAccount.findAll({
			where: { idUser: idUser }
		});
		const unique = await UserBankAccount.findOne({
			where: { accountNumber: data.accountNumber, idUser: idUser }
		});
		if (unique) {
			return 'Account Already added for the current user';
		} else {
			if (acc.length === 0) {
				data.isDefault = 1;
				await User.update(
					{
						profileStatus: `${profileStatus + 'bank'}`
					},
					{ where: { idUser } }
				);
			} else if (acc.length >= 1) {
				data.isDefault = 0;
			}
			const newAcc = await UserBankAccount.create(data);
			return await UserBankAccount.findOne({
				attributes,
				where: { id: newAcc.id }
			});
		}
	},
	/**
	 * This function used to Update User Bank account
	 * @author Didijobs <rgy713>
	 */
	updateUserBank: async (data, idUser, id) => {
		data.idUser = idUser;
		return await UserBankAccount.update(data, { where: { id: id } });
	},
	/**
	 * This function used to Delete Bank accounts
	 * @author Didijobs <rgy713>
	 */
	deleteUserBankAccount: async id => {
		return await UserBankAccount.update(
			{ status: '0' },
			{ where: { id: id } }
		);
	},
	/**
	 * This function used to Get All Bank accounts
	 * @author Didijobs <rgy713>
	 */

	getAllBankAccounts: async () => {
		return await UserBankAccount.findAll({ where: { status: 1 } });
	},
	/**
	 * This function used to All User Bank accounts
	 * @author Didijobs <rgy713>
	 */
	getUserBankAccount: async idUser => {
		return await UserBankAccount.findAll({
			where: { idUser: idUser, status: 1 }
		});
	},
	/**
	 * This function used to Bank account by ID
	 * @author Didijobs <rgy713>
	 */
	getUserBankAccountById: async accountId => {
		return await UserBankAccount.findAll({
			where: { id: accountId, status: 1 }
		});
	},
	/**
	 * This function used to Set default Bank accounts
	 * @author Didijobs <rgy713>
	 */
	setDefaultBankAccount: async (accountId, idUser) => {
		const account = await UserBankAccount.update(
			{ isDefault: 0 },
			{ where: { idUser: idUser } }
		);
		return await UserBankAccount.update(
			{ isDefault: 1 },
			{ where: { id: accountId } }
		);
	}
};
