'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');

const News = connection.define('News', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imgURL: {
        type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

});
News.sync();
/*News.create({
    title: "Title", 
    content: "Some content", 
    imgURL:"imgURL"
});*/
module.exports = News;