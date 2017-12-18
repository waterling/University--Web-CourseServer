'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Map = connection.define('Map', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    coordX: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    coordY: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    balloonContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hintContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imgURL: {
        type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Map.sync();
module.exports = Map;