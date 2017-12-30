const express = require('express');
const validator = require('validator');
const user = new (require('../utils/Users'));
const bodyParser = require('body-parser');
const crypto = require('crypto');
const sha1 = require('sha1');
const router = new express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/:id', (req, res) => {
    const userId = req.session.user;
    console.log(req.session);
    if (userId) {
        user.getUserById(userId).then(value => {
            console.log(value);
            if (value) {
                res.send(value);
            } else {
                res.send("Permission denied")   ;
            }
        });
    } else {
        res.send("Permission denied");
    }
});




module.exports = router;