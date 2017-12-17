'use strict';

const config = require('../etc/config.json');

const Sequelize = require('sequelize');



const connection = new Sequelize(`mysql://${config.database.login}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`);



module.exports = connection;