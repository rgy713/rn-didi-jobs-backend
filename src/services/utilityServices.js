const Feedback = require('../models/feedback');
module.exports = {
	createFeedback: async feedback => {
		const res = await Feedback.create(feedback);
		if (res) {
			const feedback = await Feedback.findOne({
				attributes: ['id', 'feedback', 'idUser', 'appVersion'],
				where: { id: res.id }
			});
			return feedback;
		}
	}
};
