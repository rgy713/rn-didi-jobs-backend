const JobMaster = require('../models/job_master');
module.exports = {
	generateToken: async () => {},
	updatePaymentStatus: async (jobId, posterId) => {
		return await JobMaster.update(
			{ status: 'payment-pending' },
			{
				where: {
					id: jobId,
					posterId: posterId
				}
			}
		);
	},
	confirmPayment: async (jobId, posterId) => {
		return await JobMaster.update(
			{ status: 'completed' },
			{
				where: {
					id: jobId,
					posterId: posterId
				}
			}
		);
	}
};
