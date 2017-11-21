const express = require('express');
const Organizations = require('../utils/Organizations');
const OrganizationsQueues = require('../queues/OrganizationsQueues');
const bodyParser = require('body-parser');

let organiztionsQueues = new OrganizationsQueues;
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