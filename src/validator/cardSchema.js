module.exports = {
	addCard: {
		// cardHolderName: {
		// 	isLength: {
		// 		errorMessage: 'card holder Name is required',
		// 		options: { min: 2 }
		// 	}
		// },
		cardNumber: {
			isLength: {
				errorMessage: 'card number is required and its length must be of 16 characters',
				options: { min: 16, max: 16 }
			}
		},
		expiryMonth: {
			isLength: {
				errorMessage: 'expiry month is required',
				options: { min: 2, max: 2 }
			}
		},
		expiryYear: {
			isLength: {
				errorMessage: 'expiry year is required',
				options: { min: 2, max: 2 }
			}
		}
	},

	updateCard: {
		cardNumber: {
			isLength: {
				errorMessage: 'card number is required',
				options: { min: 16, max: 16 }
			}
		},
		expiryMonth: {
			isLength: {
				errorMessage: 'expiry month is required',
				options: { min: 2, max: 2 }
			}
		},
		expiryYear: {
			isLength: {
				errorMessage: 'expiry year is required',
				options: { min: 2, max: 2 }
			}
		},
		default: {
			isLength: {
				errorMessage: 'default is required',
				options: { min: 1, max: 1 }
			}
		}
	},

	deleteCard: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'cardId is required',
				options: { min: 1 }
			}
		}
	},

	setDefaultCard: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'cardid is required',
				options: { min: 1 }
			}
		}
	}
};
