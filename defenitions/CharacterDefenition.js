'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Character = connection.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    secondName: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    isMale: {
        type: DataTypes.BOOLEAN,
    },
    speciality: {
        type: DataTypes.TEXT,
    },
    imgURL: {
        type: DataTypes.TEXT
    },
    about: {
        type: DataTypes.TEXT
    },
    strongWords: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Character.sync();
module.exports = Character;