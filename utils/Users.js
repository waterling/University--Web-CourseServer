'use strict';

const User = require('../defenitions/UserDefinition');
const sequelize = require('sequelize');

User.prototype.createUser = function (jsonUser) {
    return User.create(JSON.parse(jsonUser))
        .then(user => {
            if (user === undefined) {
                return {status: undefined};
            }
            return {status: 'success'};
        })
        .catch(error => {
            return {status: error};
        });
};

User.prototype.updateUser = function (jsonUpdateUser) {
    let temp = JSON.parse(jsonUpdateUser);
    return User.update(temp, {where: {id: temp.id}}).then((result) => {
        if (result) {
            return 'success';
        } else {
            return 'this user doesn\'t exist';
        }
    });
};

User.prototype.deleteUser = function (email) {
    return User.destroy({where: {email: email}}).then((result) => {
        if (result) {
            return 'success';
        } else {
            return 'this element doesn\'t exist';
        }
    });
};

User.prototype.getUser = function (email) {
    return User.findOne({where: {email: email}})
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

User.prototype.getUserById = function (id) {
    return User.findOne({where: {id: id}})
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

User.prototype.checkUser = (email) => {
    return User.findOne({
        where: {
            email: email,
        }
    })
};

User.prototype.isAdminUser = (isAdmin) => {
    return User.findById(Number(isAdmin), {
        attributes: ['isAdmin']
    })
};



module.exports = User;