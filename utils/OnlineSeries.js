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
    return OnlineSeries.findAll({where: {numOfSeazon: num}, order: [['numOfSer', 'DESC']]})
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

OnlineSeries.prototype.getLastSeries = function (num) {
    return OnlineSeries.findAll({limit: num, order: [['numOfSeazon', 'DESC'],['numOfSer', 'DESC']]})
        .then(value => {
            console.log('__________FindLastSeries__________');
            let temp =[];
            value.map(element => {
                temp.push(element.dataValues);
            });
            console.log(temp);
            return temp;
        }).catch(error => {

            return {

                status: 'error',

                data: error

            }

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