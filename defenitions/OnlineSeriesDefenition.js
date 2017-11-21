'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const OnlineSeries = connection.define('OnlineSeries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numOfSeazon: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numOfSer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imgURL:{
        type: DataTypes.TEXT,
    },
    src: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
OnlineSeries.sync();
module.exports = OnlineSeries;