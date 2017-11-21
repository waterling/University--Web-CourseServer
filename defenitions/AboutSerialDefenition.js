'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const AboutSerial = connection.define('AboutSerial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imgURL: {
        type: DataTypes.TEXT
    },
    trailerURL: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
AboutSerial.sync();
module.exports = AboutSerial;