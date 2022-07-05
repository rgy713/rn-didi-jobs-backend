/**
 * This function used to contain Jobs Api request Schema
 * @author Didijobs <rgy713>
 */
module.exports = {
	createJob: {
		location: {
			isLength: {
				errorMessage: 'Location is required',
				options: { min: 2 }
			}
		},
		price: {
			isLength: {
				errorMessage: 'price is required',
				options: { min: 1 }
			}
		},
		// description: {
		// 	isLength: {
		// 		errorMessage:
		// 			'description is missing or it should have minimum 15 characters',
		// 		options: { min: 1 }
		// 	}
		// },
		priorityPosting: {
			isLength: {
				errorMessage:
					'priorityPosting is missing',
				options: { min: 4 }
			}
		},
		duration: {
			isLength: {
				errorMessage: 'Duration field is required',
				options: { min: 1 }
			}
		},
		durationUnit: {
			isLength: {
				errorMessage: 'durationUnit is required',
				options: { min: 1 }
			}
		},
		skills: {
			isLength: {
				errorMessage: 'Skills field is required',
				options: { min: 1 }
			}
		}
	},

	updateJob: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		},
		location: {
			isLength: {
				errorMessage: 'Location is required',
				options: { min: 2 }
			}
		},
		price: {
			isLength: {
				errorMessage: 'Price is required',
				options: { min: 2 }
			}
		},
		// description: {
		// 	isLength: {
		// 		errorMessage:
		// 			'description is missing or it should have minimum 15 characters',
		// 		options: { min: 15 }
		// 	}
		// },
		duration: {
			isLength: {
				errorMessage: 'Duration field is required',
				options: { min: 1 }
			}
		},
		durationUnit: {
			isLength: {
				errorMessage: 'durationUnit is missing or it should contain minimum 3 characters',
				options: { min: 3 }
			}
		},
		skills: {
			isLength: {
				errorMessage: 'Skills field is required',
				options: { min: 1 }
			}
		}
	},

	updateStatus: {
		id: {
			in: ['params'],
			isLength: {
				errorMessage: 'id is required',
				options: { min: 1 }
			}
		},
		status: {
			isLength: {
				errorMessage:
					'status is missing or it should have minimum 3 characters.',
				options: { min: 3 }
			}
		}
	},
	getAllJobs: {
		location: {
			isLength: {
				errorMessage: 'Location is required',
				options: { min: 2 }
			}
		},
		radius: {
			isLength: {
				errorMessage: 'radius field is required',
				options: { min: 1 }
			}
		}
	}
};
