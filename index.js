/**
 * This File is entry point for backend app
 * @author Didijobs <rgy713>
 */
const express = require('express');
var https = require('https');
var http = require('http');
require('dotenv').config();
const app = express();
const passport = require('passport');
const fileUpload = require('express-fileupload');
const routes = require('./src/routes/routes');

const authenticator = require('./src/middlewares/authenticate');
const WebSocket = require('./src/messages/Web Sockets');

// const authenticator = require('./src/middlewares/authenticate');
//  api routes
var compression = require('compression');

const cors = require('cors');

app.options('*', cors()); // include before other routes

app.use(compression());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS, HEAD'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, x-access-token,  Content-Type, Accept '
	);
	next();
});

authenticator.init(app);

app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// parse application/json
app.use(express.json());

app.use(fileUpload());
//validate secureAPI

// API routes initialization with authentication
app.use(
	'/api/v1',
	passport.authenticate(['bearer', 'anonymous'], { session: true }),
	(req, res, next) => {
		console.log(req.url);
		if (
			['/auth/login', '/auth/register', '/auth/verify-mobile'].includes(
				req.url
			) ||
			req.user
		) {
			next();
		} else {
			res.status(401).send({
				status: false,
				data: [],
				message: 'Not Authorized',
				api_version: '1.0'
			});
		}
	},
	routes
);

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to API' });
});
//Configure SSL key_secret
// var options = {
//   key: fs.readFileSync("./", "utf8"),
//   cert: fs.readFileSync("./", "utf8"),
//   ca: [
//     fs.readFileSync("./", "utf8"),
//     fs.readFileSync("./", "utf8"),
//     fs.readFileSync("./", "utf8"),
//   ],
// };

const port = process.env.PORT || 3000;
// Start your app.
var httpServer = http.createServer(app);
const socketIo = require('socket.io')(httpServer);
global.io = socketIo;

global.io.on('connection', WebSocket.connection);

//application is listening at port
httpServer.listen(port, () => {
	console.log('application running on port ' + port);
});
