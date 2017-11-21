'use strict';

const News = require('../defenitions/NewsDefenition');

const Sequelize = require('sequelize');

News.prototype.getAllNews = function () {
    News.findAll()
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                temp[i] = (element.dataValues);
                i++;
            });
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

News.prototype.getLastNews = function (num) {
    News.findAll({limit: num, order: [['createdAt', 'DESC']]})
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                temp[i] = (element.dataValues);
                i++;
            });
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

News.prototype.addNews = function (jsonNews) {
    News.create(JSON.parse(jsonNews))
        .then(news => {
            if (news === undefined) {
                return {status: undefined};
            }
            return {status: 'success'};
        })
        .catch(error => {
            return {status: error};
        });
};

News.prototype.updateNews = function (jsonNews) {
    let temp = JSON.parse(jsonNews);
    console.log(temp);
    News.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};
module.exports = News;