'use strict';

const DataTypes = require("sequelize");
const Characters = require('./CharacterDefenition');
const Stimulants = require('./StimulantDefenition');
const connection = require('../connections/DataBaseConnect');

const CharsUseStimulants = connection.define('CharsUseStimulants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    charId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stimulantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    howOften: {
        type: DataTypes.ENUM,
        values: ['often','periodically','rarely'],
    }

});

Characters.hasMany(CharsUseStimulants,{foreignKey:'orgId', sourceKey:'id'});
Stimulants.hasMany(CharsUseStimulants,{foreignKey:'stimulantId', sourceKey:'id'});

CharsUseStimulants.sync();
module.exports = CharsUseStimulants;