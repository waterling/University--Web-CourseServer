const express = require('express');
const Characters = require('../utils/Characters');
const CharactersQueues = require('../queues/CharactersQueues');
const bodyParser = require('body-parser');

let charactersQueues = new CharactersQueues;
let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//get all, one,
router.get('/:id',function (req, res) {

});

router.delete('/:id',function (req, res) {

});

router.post('/admin/:id', function (req, res) {

});



module.exports = router;