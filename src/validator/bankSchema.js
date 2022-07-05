/**
 * This function used to contain Bank Accounts Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	addBank: {
		accountHolderName: {
			isLength: {
				errorMessage: 'account holder Name is required',
				options: { min: 2 }
			}
		},
		accountNumber: {
			isLength: {
				errorMessage: 'account number is required',
				options: { min: 9 }
			}
		}
		// bankName: {
		// 	isLength: {
		// 		errorMessage: 'bank name is required',
		// 		options: { min: 2 }
		// 	}
		// },
		// securityCode: {
		// 	isLength: {
		// 		errorMessage: 'security code is required',
		// 		options: { min: 3 }
		// 	}
		// }
	},

	updateBank: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		},
		accountHolderName: {
			isLength: {
				errorMessage: 'account holder Name is required',
				options: { min: 2 }
			}
		},
		accountNumber: {
			isLength: {
				errorMessage: 'account number is required',
				options: { min: 9 }
			}
		},
		bankName: {
			isLength: {
				errorMessage: 'bank name is required',
				options: { min: 2 }
			}
		},
		securityCode: {
			isLength: {
				errorMessage: 'security code is required',
				options: { min: 3 }
			}
		}
	},

	deleteBankAccount: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		}
	},

	setDefaultBank: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		}
	}
};
