// import server basics
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');

// import modules
const index = require('./routes/index');
const quiz = require('./routes/quiz');
const login = require('./routes/login');
const tutorial = require('./routes/tutorial');
const blank = require('./routes/blank');
const incorrect = require('./routes/incorrect');
const correct = require('./routes/correct');
const complete = require('./routes/complete');

// create app and set port
const port = process.env.PORT || 3000;
const app = express();

// create environment
app.set('port', port);
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs');
app.engine(
	'hbs',
	handlebars({
		layoutsDir: __dirname + '/views/layouts',
		extname: 'hbs',
		defaultLayout: 'index',
	})
);
/* app.use(express.favicon());
app.use(express.logger('dev')); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(express.methodOverride());
app.use(express.cookieParser('secret key'));
app.use(express.session());
app.use(app.router()); */
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', index.view);
app.get('/quiz', quiz.view);
app.get('/tutorial', tutorial.view);
app.get('/blank', blank.view);
app.get('/incorrect', incorrect.view);
app.get('/login', login.view);
app.get('/correct', correct.view);
app.get('/complete', complete.view);

// create server and listen on port
http.createServer(app).listen(app.get('port'), function () {
	console.log(`Server listening on port ${app.get('port')}`);
});
