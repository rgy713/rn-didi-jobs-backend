/**
 * This function used to contain Auth Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	generateOtp: {
		email: {
			isEmail: {
				bail: true,
				errorMessage: 'Incorrect email syntex'
			}
		}
	},
	generateMobileOtp: {
		mobileNo: {
			isLength: {
				errorMessage: 'Invalid Mobile no',
				// Multiple options would be expressed as an array
				options: { min: 10, max: 10 }
			}
		}
	},
	login: {
		phone: {
			isLength: {
				errorMessage:
					'phoneNo is missing or phoneNo number must be 10 digits long',
				// Multiple options would be expressed as an array
				options: { min: 10, max: 10 }
			}
		}
	},
	verifyOtp: {
		email: {
			isEmail: {
				bail: true,
				errorMessage: 'Incorrect email syntex'
			}
		},
		otp: {
			isLength: {
				errorMessage: 'Incorrect OTP',
				// Multiple options would be expressed as an array
				options: { min: 6, max: 6 }
			}
		}
	},
	registerUser: {
		phone: {
			errorMessage: 'Please enter Phone Number in 10 digits',
			isLength: {
				options: { min: 10, max: 10 }
			},
			matches: {
				options: [/^\d{10}$/],
				errorMessage: 'Please enter digits'
			},
			trim: true
		},
		userType: {
			isLength: {
				errorMessage: 'userType is required',
				options: { min: 1, max: 1 }
			}
		}
	},
	verifyEmail: {
		otp: {
			isLength: {
				errorMessage: 'invalid otp',
				options: { min: 6, max: 6 }
			}
		},
		email: {
			isEmail: {
				bail: true,
				errorMessage: 'Email is missing or Incorrect email syntex'
			}
		}
	},
	verifyMobile: {
		otp: {
			isLength: {
				errorMessage: 'invalid otp',
				options: { min: 6, max: 6 }
			}
		},
		phone: {
			isLength: {
				errorMessage: 'Invalid Mobile no',
				// Multiple options would be expressed as an array
				options: { min: 10, max: 10 }
			}
		}
	}
};

// email: {
// 	errorMessage: 'Please enter a valid email address',
// 	isEmail: true,
// 	trim: true,
// 	custom: {
// 		options: value => {
// 			if (value) {
// 				return new Promise(function (resolve, reject) {
// 					dns_validate_email.validEmail(value, function (
// 						valid
// 					) {
// 						console.log('valid:' + valid);
// 						if (valid) {
// 							resolve(value);
// 						} else {
// 							reject(
// 								new Error({
// 									errorMessage: 'Not a valid email'
// 								})
// 							);
// 						}
// 					});
// 				}).then(function (email) {
// 					return new Promise(function (resolve, reject) {
// 						User.findBy('email', email, function (
// 							err,
// 							result
// 						) {
// 							if (err) {
// 								reject('Unable to validate email');
// 							} else {
// 								console.log(result);
// 								resolve(result);
// 							}
// 						});
// 					}).then(function (result) {
// 						return result.length === 0;
// 					});
// 				});
// 			}
// 		},
// 		errorMessage: 'This email is already in use'
// 	}
// }
