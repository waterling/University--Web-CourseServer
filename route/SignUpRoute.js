const express = require('express');
const Users = require('../utils/Users');
const bodyParser = require('body-parser');


let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/', function (req, res) {
    const users = new Users;
    users.createUser(req.body).then(result=>{
        req.send(result);
    })
});



module.exports = router;