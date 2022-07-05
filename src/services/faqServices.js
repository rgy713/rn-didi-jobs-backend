const FAQ = require('../models/faq_master');

module.exports = {
	/**
	 * This function used to get FAQ from DB
	 * @author Didijobs <rgy713>
	 */
	getFaqs: async () => {
		let faq = await FAQ.findAll({
			attributes: ['id', 'question', 'answer', 'parentId', 'status']
		});
		let modules = [];
		[...faq].map(item => {
			if (!item.parentId) {
				modules.push(item);
			}
		});
		faq.map((item, index) => {
			if (item.parentId) {
				res = modules.map(data => {
					if (data.dataValues.id === item.parentId) {
						data.dataValues.answer = item.dataValues;
					}
				});
			}
		});
		return modules;
	}
};
