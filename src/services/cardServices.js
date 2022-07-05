const { v4 } = require('uuid');
const CardDetail = require('../models/card');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../config/database').MAIN_DATABASE;
module.exports = {
	/**
	 * This function used to Add Payment Card
	 * @author Didijobs <rgy713>
	 */
	addCard: async card => {
		card.cardId = v4();
		card.status = 'active';
		const { cardNumber } = card;

		const checkCardProvider = number => {
			var re = {
				electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
				maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
				dankort: /^(5019)\d+$/,
				interpayment: /^(636)\d+$/,
				unionpay: /^(62|88)\d+$/,
				visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
				mastercard: /^5[1-5][0-9]{14}$/,
				amex: /^3[47][0-9]{13}$/,
				diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
				discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
				jcb: /^(?:2131|1800|35\d{3})\d{11}$/
			};

			for (var key in re) {
				if (re[key].test(number)) {
					return key;
				}
			}
		};
		card.cardType = checkCardProvider(cardNumber);
		const defaultCard = await CardDetail.findOne({
			where: { idUser: card.idUser, status: 'active' }
		});
		card.default = defaultCard === null ? 1 : 0;
		const finalCard = await CardDetail.create(card);
		if (finalCard) {
			function maskify(cc) {
				return cc.replace(/.(?=.{4})/g, 'X');
			}
			finalCard.cardNumber = maskify(cardNumber);
			return finalCard;
		} else {
			return false;
		}
	},
	/**
	 * This function used to get Payment Cards of an user
	 * @author Didijobs <rgy713>
	 */
	getUserCards: async idUser => {
		const cards = await CardDetail.findAll({
			where: { idUser: idUser, status: 'active' }
		});
		if (cards) {
			const number = cards.map(item => {
				function maskify(cc) {
					return cc.replace(/.(?=.{4})/g, 'X');
				}
				item.cardNumber = maskify(item.cardNumber);
				return item;
			});
			return number;
		}
	},
	/**
	 * This function used to update Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	updateCard: async (cardId, card) => {
		return await CardDetail.update(card, { where: { cardId: cardId } });
	},
	/**
	 * This function used to set default payment card for an user
	 * @author Didijobs <rgy713>
	 */
	setDefaultCard: async (cardId, idUser) => {
		const [results, metadata] = await sequelize.query(
			`update tbl_kjobs_card_details set is_default =(CASE WHEN card_id='${cardId}' THEN 1 ELSE 0 END) WHERE user_id=${idUser}`
		);
		return results;
	},
	/**
	 * This function used to delete a Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	deleteCard: async cardId => {
		return await CardDetail.update(
			{ status: 'deleted', default: 0 },
			{ where: { cardId: cardId } }
		);
	},
	/**
	 * This function used to find a default Payment Card of an user
	 * @author Didijobs <rgy713>
	 */
	getDefaultCard: async idUser => {
		return await CardDetail.findOne({
			where: { default: 1, idUser: idUser }
		});
	}
};
