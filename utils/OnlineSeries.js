'use strict';

const OnlineSeries = require('../defenitions/OnlineSeriesDefenition');

OnlineSeries.prototype.getAllSeries = function () {
    OnlineSeries.findAll()
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

OnlineSeries.prototype.getSeason = function (num) {
    OnlineSeries.findAll({where: {numOfSeazon: num}})
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

OnlineSeries.prototype.addSeries = function (jsonSeries) {
    OnlineSeries.create(JSON.parse(jsonSeries))
        .then(news => {
            if (!news) {
                return {status: undefined};
            }
            return {status: 'success'};
        })
        .catch(error => {
            return {status: error};
        });
};

OnlineSeries.prototype.updateSeries = function (jsonSeries) {
    let temp = JSON.parse(jsonSeries);
    console.log(temp);
    OnlineSeries.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};
module.exports = OnlineSeries;