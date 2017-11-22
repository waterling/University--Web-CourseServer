'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Users = connection.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
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
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Character.sync();
module.exports = Users;