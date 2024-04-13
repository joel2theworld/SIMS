const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errorHandler } = require('./backend/middleware/errorMiddleware');

const customHbs = exphbs.create({
	extname: '.hbs',
	layout: path.join(__dirname, './views'),

	//! Handlebars helpers
	helpers: {
		//? Date format
		dateFormat: function (value) {
			return new Date(value).toLocaleString('en-US');
		},
		assignInc: function (a, b, opts) {
			if (a === b) {
				return opts.fn(this);
			} else {
				return opts.inverse(this);
			}
		},

		notAssignInc: function (a, b, opts) {
			// for (let i = 0; i < a; i++) {}

			if (a === b) {
				return opts.fn(this);
			} else {
				return opts.inverse(this);
			}
		},

		indexIncr: function (value, options) {
			return parseInt(value) + 1;
		},

		// mathHelp: ("math", function(lvalue, operator, rvalue, options) {
		//     lvalue = parseFloat(lvalue);
		//     rvalue = parseFloat(rvalue);

		//     return {
		//         "+": lvalue + rvalue,
		//         "-": lvalue - rvalue,
		//         "*": lvalue * rvalue,
		//         "/": lvalue / rvalue,
		//         "%": lvalue % rvalue
		//     }[operator];
		// })
	},
});

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//! Handlebars Template engines
app.engine('hbs', customHbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

//! Backend routes

app.use('/', require('./backend/routes/homeRoutes'));

app.use('/', require('./backend/routes/studentRoutes'));

app.use('/', require('./backend/routes/staffRoutes'));

app.use('/assign', require('./backend/routes/assignIncRoutes'));

app.use('/', require('./backend/routes/incidentPostRoutes'));

app.use('/', require('./backend/routes/feedbackRoutes'));

app.use(errorHandler);

//? create connection
const con = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

//! connect to database
con.connect((err) => {
	if (err) throw err;
	console.log(`DB connected`);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
