const UserService = require('../services/userServices');
const jwtHelper = require('../helpers/jwtHelper');
let AuthorizationForm = {};

AuthorizationForm.getUserById = async id => {
	let response = false;
	await UserService.getUser(id)
		.then(user => {
			response = user;
		})
		.catch(error => {
			response = error;
		});
	return response;
};

AuthorizationForm.getUserByToken = async token => {
	let response = false;
	const payload = await jwtHelper.validateToken(token);
	console.log(payload,'step1234');
	if (payload) {
		response = await AuthorizationForm.getUserById(payload.idUser);
	}
	return response;
};

module.exports = AuthorizationForm;
