const moment = require('moment');
const admin = require('firebase-admin');
const AWS = require('aws-sdk');
var serviceAccount = require('../config/digitalcoders-a4624-firebase-adminsdk-a0ww1-8f3ae52b9e.json');

//AWS SNS Initialization
const SESConfig = {
	accessKeyId: process.env.AWS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY,
	region: 'ap-south-1'
};
AWS.config.update(SESConfig);

//Firebase initialize admin app
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

module.exports = {
	// generateOrderId: sequence =>
	// 	`BAAZEERAM${moment().format('DDMMYYYY')}${sequence}`,
	// getOrderItems: cartItems =>
	// 	cartItems.map(item => ({
	// 		productId: item.productId._id,
	// 		price: item.productId.productPrice.salePrice,
	// 		quantity: item.quantity,
	// 		sku: item.productId.sku
	// 	})),
	// getSubTotal: orderItems =>
	// 	orderItems.reduce(
	// 		(sum, item) =>
	// 			sum + parseFloat(item.quantity) * parseFloat(item.price),
	// 		0
	// 	),
	// getTaxAmount: subTotal => (subTotal / 100) * 18,
	// sendNotification: async (tokens, message) => {
	// 	const messaging = admin.messaging();
	// 	var payload = {
	// 		notification: {
	// 			title: message.title,
	// 			body: message.message
	// 		},
	// 		tokens
	// 	};
	// 	await messaging.sendMulticast(payload).then(result => {
	// 		console.log('push message - sent', result);
	// 	});
	// },
	sendMessage: async (message, mobileNo) => {
		var params = {
			Message: message,
			PhoneNumber: `+91${mobileNo}`
		};

		// Create promise and SNS service object
		var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
			.publish(params)
			.promise();

		// Handle promise's fulfilled/rejected states
		publishTextPromise
			.then(function (data) {
				console.log('MessageID is ' + data.MessageId);
			})
			.catch(function (err) {
				console.error('Error in sending message', err, err.stack);
			});
	}
};
