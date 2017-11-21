'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Stimulant = connection.define('Stimulant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imgURL: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Stimulant.sync();
module.exports = Stimulant;