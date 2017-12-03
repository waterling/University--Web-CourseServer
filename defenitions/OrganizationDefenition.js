'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const Organization = connection.define('Organization', {
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
        type: DataTypes.TEXT,
    },
    typeOfOrganization: {
        type: DataTypes.ENUM,
        values: ['legal', 'semi-legal', 'illegal']
    },
    strongWords: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
Organization.sync();
module.exports = Organization;