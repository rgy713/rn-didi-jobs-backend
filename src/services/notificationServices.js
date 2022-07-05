const NotificationTypes = require('../config/notificationTypes');
const Notification = require('../models/notification');
const utilityHelper = require('../helpers/utilityHelper');
const { Op } = require('sequelize');
module.exports = {
	/**
	 * This function used to get User Notigication
	 * @author Didijobs <rgy713>
	 */
	getNotifications: async (idUser, limit = 10, offset = 0) => {
		return await Notification.findAll({
			offset: offset,
			limit: limit,
			where: { idUser: idUser, readStatus: { [Op.ne]: 'deleted' } }
		});
	},
	/**
	 * This function used to Update Notification to read
	 * @author Didijobs <rgy713>
	 */
	updateNotification: async (id, idUser) => {
		try {
			return await Notification.update(
				{
					readStatus: 'read'
				},
				{
					where: { idUser: idUser, id: id }
				}
			);
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * This function used to Delete Notification
	 * @author Didijobs <rgy713>
	 */
	deleteNotification: async (id, idUser) => {
		try {
			return await Notification.update(
				{
					readStatus: 'deleted'
				},
				{
					where: { idUser: idUser, id: { [Op.in]: id } }
				}
			);
		} catch (error) {
			console.error(error);
		}
	}
};
