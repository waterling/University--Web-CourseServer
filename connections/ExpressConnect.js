const config = require('../../etc/config.json');
const passport = require('passport');
const cors = require('cors');

const express = require('express');
const session = require('express-session');

const app = express();

app.listen(config.serverPort, function () {

    console.log('App started on ' + config.serverPort + ' port!');

});
app.use(session());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
module.exports = app;