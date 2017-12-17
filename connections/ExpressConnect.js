const config = require('../etc/config.json');
const passport = require('passport');
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const express = require('express');
const session = require('express-session');

const app = express();

app.use(cors());
require('../Auth/passport')(passport);
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('../route/auth')(app,passport);
require('../download/Images')(app);
app.listen(config.serverPort, function () {

    console.log('App started on ' + config.serverPort + ' port!');

});/*
app.use(session());*/
/*app.use(passport.initialize());
app.use(passport.session());*/
module.exports = app;