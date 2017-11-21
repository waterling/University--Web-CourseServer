'use strict';

const DataTypes = require("sequelize");
const Characters = require('./CharacterDefenition');
const connection = require('../connections/DataBaseConnect');

const CharsHistory = connection.define('CharsHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    charId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    interestingFacts: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imgURL: {
        type: DataTypes.TEXT
    }

});

Characters.hasMany(CharsHistory, {foreignKey: 'orgId', sourceKey: 'id'});

CharsHistory.sync();
module.exports = CharsHistory;