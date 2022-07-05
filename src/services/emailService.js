require('dotenv').config();
const nodemailer = require('nodemailer');
/**
 * This function used to Send email by nodemailer
 * @author Didijobs <rgy713>
 */
const mailTransporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

module.exports = async mailDetails => {
	return mailTransporter.sendMail(mailDetails);
};
