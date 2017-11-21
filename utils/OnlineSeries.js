'use strict';

const OnlineSeries = require('../defenitions/OnlineSeriesDefenition');

OnlineSeries.prototype.getAllSeries = function () {
    return OnlineSeries.findAll()
        .then(value => {
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues);
            });
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

OnlineSeries.prototype.getSeason = function (num) {
    return OnlineSeries.findAll({where: {numOfSeazon: num}})
        .then(value => {
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues);
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
    return OnlineSeries.create(JSON.parse(jsonSeries))
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
    return OnlineSeries.update(JSON.parse(jsonSeries), {where: {id: temp.id}}).then((result) => {
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });

};
module.exports = OnlineSeries;