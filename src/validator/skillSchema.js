/**
 * This function used to contain Skills Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	addUserSkill: {
		skillIds: {
			isLength: {
				errorMessage: 'skill id is required',
				options: { min: 1 }
			}
		}
	},

	addSkill: {
		skillIds: {
			isLength: {
				errorMessage: 'skill id is required',
				options: { min: 1 }
			}
		}
	}
};
