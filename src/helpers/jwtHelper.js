
 /**
 * This File used to handle JWT tokens
 * @author Didijobs <rgy713>
 */
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');
const issuer = 'Didijobs'; // Issuer
const subject = 'info@didijobs.com'; // Subject
const audience = 'http://didijobs.in'; // Audience
const signOptions = {
	issuer: issuer,
	subject: subject,
	audience: audience,
	expiresIn: '1y',
	algorithm: 'RS256'
};
const verifyOptions = {
	issuer: issuer,
	subject: subject,
	audience: audience,
	expiresIn: '1y',
	algorithm: ['RS256']
};

module.exports = {
	 /**
	 * This function used to Validate token
	 * @author Didijobs <rgy713>
	 */
	validateToken: async token => {
		try {
			return await jwt.verify(token, publicKEY, verifyOptions);
		} catch (err) {
			return null;
		}
	},
	/**
	 * Create Token Create JWT Token
	 * @author Didijobs <rgy713>
	 */
	createToken: async payload => {
		try {
			return await jwt.sign(payload, privateKEY, signOptions);
		} catch (err) {
			return null;
		}
	}
};
