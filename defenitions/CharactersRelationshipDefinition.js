'use strict';

const DataTypes = require("sequelize");
const Characters = require('./CharacterDefenition');
const connection = require('../connections/DataBaseConnect');

const CharactersRelationship = connection.define('CharactersRelationship', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    charId1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    charId2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['enemy', 'friend']
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

Characters.hasMany(CharactersRelationship, {foreignKey: 'orgId1', sourceKey: 'id'});
Characters.hasMany(CharactersRelationship, {foreignKey: 'orgId2', sourceKey: 'id'});

CharactersRelationship.sync();
module.exports = CharactersRelationship;