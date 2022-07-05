const { Op } = require('sequelize');
const OtpHelper = require('../helpers/OtpHelper');
const User = require('../models/user');
const UserOtp = require('../models/user_otp');
const { createToken } = require('../helpers/jwtHelper');

const userServices = require('./userServices');
module.exports = {
	/**
	 * This function used to login user
	 * @author Didijobs <rgy713>
	 */
	login: async data => {
		const { phone, firebaseUid } = data;
		const user = await userServices.getUserByMobile(phone);
		if (user) {
			console.log(user);
			const payload = {
				idUser: user.id,
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userType: user.userType
			};
			const token = await createToken(payload);
			return { token, user };
		} else {
			throw new Error(`User not exists`);
		}
	},
	/**
	 * This function used to Register User
	 * @author Didijobs <rgy713>
	 */
	registerUser: async data => {
		const { phone, userType } = data;
		let user = await userServices.getUserByMobile(phone);
		const otp = await OtpHelper.generateMobileOtp(phone);
		console.log(user);
		if (!user) {
			user = await User.create({
				phone: phone,
				status: '1',
				userType: userType,
				profilStatus: '0'
			});
		}
		if (user) {
			await UserOtp.create({
				idUser: user.idUser,
				otp: otp,
				otpType: 'mobile'
			});
			return true;
		} else {
			throw new Error(`Error in generate OTP`);
		}
	},
	/**
	 * This function used to Register User
	 * @author Didijobs <rgy713>
	 */
	// registerUser: async data => {
	// 	const { phone, firebaseUid, userType, email } = data;
	// 	const user = await userServices.getUserByMobile(phone);
	// 	if (user) {
	// 		throw new Error(`User already exists`);
	// 	} else {
	// 		let user = await User.create({
	// 			phone: phone,
	// 			firebaseUid: firebaseUid,
	// 			status: 1,
	// 			userType: userType,
	// 			email: email ? email : null
	// 		});
	// 		if (email) {
	// 			const otpToken = await OtpHelper.generateOtp(email);

	// 			await UserOtp.create({
	// 				otp: otpToken,
	// 				idUser: user.idUser,
	// 				otpType: 'email'
	// 			});
	// 		}

	// 		const payload = {
	// 			idUser: user.idUser,
	// 			phone: user.phone
	// 		};

	// 		const token = await createToken(payload);
	// 		return { token, user };
	// 	}
	// },
	/**
	 * This function used to Verify Token
	 * @author Didijobs <rgy713>
	 */
	verifyOtp: async (data, idUser) => {
		const { email, otp } = data;
		const user = await User.findOne({
			where: {
				idUser,
				// emailVerifyStatus: '0',
				status: '1'
			},
			include: [
				{
					model: UserOtp,
					as: 'otp',
					where: { otp }
				}
			]
		});
		console.log(user);
		if (user) {
			const { profileStatus } = user.dataValues;
			if (!profileStatus.includes('email')) {
				await User.update(
					{
						emailVerifyStatus: '1',
						email: email,
						profileStatus: `${profileStatus + 'email'}`
					},
					{ where: { id: idUser, status: '1' } }
				);
				return true;
			} else {
				await User.update(
					{
						emailVerifyStatus: '1',
						email: email
					},
					{ where: { id: idUser, status: '1' } }
				);
				return true;
			}
		} else {
			return false;
		}
	},
	/**
	 * This function used to Verify Token
	 * @author Didijobs <rgy713>
	 */
	verifyMobileOtp: async data => {
		const { phone, otp } = data;
		const user = await User.findOne({
			where: { phone: phone, status: '1' },
			include: [
				{
					model: UserOtp,
					as: 'otp',
					where: { otp, otpType: 'mobile' }
				}
			]
		});
		if (user) {
			const payload = {
				idUser: user.idUser,
				phone: user.phone
			};
			const token = await createToken(payload);
			return {
				user,
				authToken: token
			};
		} else {
			return false;
		}
	},
	/**
	 * This function used to generate email OTP and send email
	 * @author Didijobs <rgy713>
	 */
	generateOtp: async (body, user) => {
		let userOtp;
		const newUser = await User.findByPk(user.idUser);
		// newUser.email = body.email;
		// newUser.save();
		const otpToken = await OtpHelper.generateOtp(body.email);
		const recentOtp = await UserOtp.findOne({
			where: { idUser: newUser.idUser }
		});
		if (recentOtp) {
			userOtp = await UserOtp.update(
				{ otp: otpToken },
				{ where: { idUser: newUser.idUser } }
			);
		} else {
			userOtp = await UserOtp.create({
				idUser: newUser.idUser,
				otp: otpToken
			});
		}
		//newUser.save();
		if (userOtp) {
			return true;
		} else {
			throw new Error(`Error in generate OTP`);
		}
	}
};
