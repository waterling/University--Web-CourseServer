'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Users = connection.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    passwordSha1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        // allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Users.sync();
module.exports = Users;