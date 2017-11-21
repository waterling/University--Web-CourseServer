'use strict';

const DataTypes = require("sequelize");
const Characters = require('./CharacterDefenition');
const OnlineSeries = require('./OnlineSeriesDefenition');
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
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    seriesId: {
        type: DataTypes.STRING
    },
    imgURL: {
        type: DataTypes.TEXT
    }

});

Characters.hasMany(CharsHistory, {foreignKey: 'orgId', sourceKey: 'id'});
OnlineSeries.hasMany(CharsHistory, {foreignKey: 'seriesId', sourceKey: 'id'});

CharsHistory.sync();
module.exports = CharsHistory;