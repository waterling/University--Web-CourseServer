const config = require('../etc/config.json');
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const express = require('express');
const session = require('express-session');

const app = express();

app.use(cors({credentials: true, origin: `${config.clientHost}:${config.clientPort}`}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

const MySQLStore = require('express-mysql-session')(session);

const configMS = {
    user: config.database.login,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
    database: config.database.name
};

const sessionStore = new MySQLStore(configMS);

app.use(session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));




require('../download/Images')(app);
app.listen(config.serverPort, function () {
    console.log('App started on ' + config.serverPort + ' port!');
});
module.exports = app;