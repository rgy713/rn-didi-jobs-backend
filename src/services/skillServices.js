const { bulkCreate } = require('../models/user');
const Skill = require('../models/user_skill');
const sequelize = require('../config/database').MAIN_DATABASE;
module.exports = {
	/**
	 * This function used to Insert User Skills
	 * @author Didijobs <rgy713>
	 */
	addUserSkills: async (skillIds, idUser) => {
		const skillModels = skillIds.map(item => {
			return {
				idUser: idUser,
				skillId: item
			};
		});
		await Skill.bulkCreate(skillModels);

		// const [results, metadata] =
		// 	await sequelize.query(`SELECT tbl_kjobs_skill_master.id ,tbl_kjobs_skill_master.title,tbl_kjobs_skill_master.short_desc
		// 		FROM tbl_kjobs_skill_master
		// 		LEFT JOIN tbl_kjobs_user_skill ON tbl_kjobs_skill_master.id = tbl_kjobs_user_skill.skill_id
		// 		WHERE user_id = ${idUser}`);
		// console.log(results);
		return true;
	},
	/**
	 * This function used to Update User Skills
	 * @author Didijobs <rgy713>
	 */
	upadteSkills: async (skillIds, idUser) => {
		const res = await Skill.destroy({ where: { idUser: idUser } });
		console.log(res);
		const skillModels = skillIds.map(item => {
			return {
				idUser: idUser,
				skillId: item
			};
		});
		await Skill.bulkCreate(skillModels);
		// const [results, metadata] =
		// 	await sequelize.query(`SELECT tbl_kjobs_skill_master.id ,tbl_kjobs_skill_master.title,tbl_kjobs_skill_master.short_desc
		// 	FROM tbl_kjobs_skill_master
		// 	LEFT JOIN tbl_kjobs_user_skill ON tbl_kjobs_skill_master.id = tbl_kjobs_user_skill.skill_id
		// 	WHERE user_id = ${idUser}`);
		return true;
	},
	/**
	 * This function used to Get User Skills
	 * @author Didijobs <rgy713>
	 */
	getUserSkill: async idUser => {
		const [results, metadata] =
			await sequelize.query(`SELECT tbl_kjobs_skill_master.id ,tbl_kjobs_skill_master.title,tbl_kjobs_skill_master.short_desc
			FROM tbl_kjobs_skill_master
			LEFT JOIN tbl_kjobs_user_skill ON tbl_kjobs_skill_master.id = tbl_kjobs_user_skill.skill_id
			WHERE user_id = ${idUser}`);
		return results;
	}
};
