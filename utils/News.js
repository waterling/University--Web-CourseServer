'use strict';

const News = require('../defenitions/NewsDefenition');

// +
News.prototype.getAllNews = function () {
    return News.findAll()
        .then(value => {
            console.log('__________FindAllNews__________');
            let temp=[];
            value.map(element => {
                temp.push(element.dataValues);
            });
            return (temp);
        });
};

// +
News.prototype.getLastNews = function (num) {
    return News.findAll({limit: num, order: [['createdAt', 'DESC']]})
        .then(value => {
            console.log('__________FindLastNews__________');
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

// +
News.prototype.addNews = function (jsonNews) {
    return News.create(JSON.parse(jsonNews))
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

// +
News.prototype.updateNews = function (jsonNews) {
    let temp = JSON.parse(jsonNews);
    return News.update(temp, {where: {id: temp.id}}).then((result) => {
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });

};

// +
News.prototype.deleteNews = function (id) {
    return News.destroy({where:{id:id}}).then((result)=>{
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });
};

module.exports = News;