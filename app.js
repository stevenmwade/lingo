var express = require('express');
var bodyParser = require('body-parser');

// We need database persistence
var mongoose = require('mongoose');

// Express Session allows us to use Cookies to keep track of
// a user across multiple pages. We also need to be able to load
// those cookies using the cookie parser
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Flash allows us to store quick one-time-use messages
// between views that are removed once they are used.
// Useful for error messages.
var flash = require('connect-flash');

// Load in the base passport library so we can inject its hooks
// into express middleware.
var passport = require('passport');

// Load in our passport configuration that decides how passport
// actually runs and authenticates
var passportConfig = require('./config/passport');

// Pull in our two controllers...
var indexController = require('./controllers/index');
var authenticationController = require('./controllers/authentication.js');
var quizController = require('./controllers/quizController.js');
var translateController = require('./controllers/translate.js');


mongoose.connect(process.env.MONGOHQ_URL || "mongodb://localhost/lingo");

// Define a base express app...
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// Add in the cookieParser and flash middleware so we can
// use them later
app.use(cookieParser());
app.use(flash());

// Initialize the express session. Needs to be given a secret property
app.use(session({secret: 'secret'}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());


// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// Authenticate log-in using Passport
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  });

app.get('/', indexController.index);
app.get('/translate', indexController.translate);

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

// Quizzes
app.get('/quiz', indexController.quiz);
app.get('/quizzes/getQuizzes', quizController.getQuizzes);
app.post('/quizzes/addQuiz', quizController.addQuiz);
app.get('/quiz/:id', quizController.createQuiz);
app.get('/quiz/getWords', quizController.getWords);
app.post('/quiz/addToQuiz', quizController.addToQuiz);
app.get('/progress', indexController.progress);
app.post('/getTranslation', translateController.getTranslation);

var port = process.env.PORT || 9063;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
