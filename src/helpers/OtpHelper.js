const sendEmail = require('../services/emailService');
const MessageHelper = require('../helpers/MessageHelper');
const utilityHelper = require('../helpers/utilityHelper');
module.exports = {
	/**
	 * This function used to generate OTP and send email
	 * @author Didijobs <rgy713>
	 */
	generateOtp: async (emailId, min = 000000, max = 999999) => {
		// const OTP = Math.floor(Math.random() * (max - min + 1) + min);
		const OTP = '000000';
		let mailDetails = {
			from: process.env.FROM,
			to: emailId,
			subject: 'Verify OTP',
			text: `Please use this OTP to verify your email: ${OTP}`
		};
		// let mail = await sendEmail(mailDetails);
		return OTP;
	},
	generateMobileOtp: async (mobileNo, min = 000000, max = 999999) => {
		// const OTP = Math.floor(Math.random() * (max - min + 1) + min);
		const OTP = '000000';
		const message = MessageHelper.OTP_MESSAGE.message.replaceAll(
			'${otp}',
			OTP
		);
		console.log('message', message);
		await utilityHelper.sendMessage(message, mobileNo);
		return OTP;
	}
};
