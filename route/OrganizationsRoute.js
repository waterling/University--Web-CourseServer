const express = require('express');
const Organizations = require('../utils/Organizations');
const OrganizationsQueues = require('../queues/OrganizationsQueues');
const bodyParser = require('body-parser');
const config = require('../etc/config.json');
const Busboy = require('busboy');
const fs = require('fs');

let imageURL;

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
    const organizations = new Organizations;
    if (req.query.id){
        organizations.getOrganization(req.query.id)
            .then(data=>{
                res.send(data);
            })
    } else {
        organizations.getAllOrganizations()
            .then(data => {
                res.send(data);
                console.log('Взятые даннаые (getAllOrganizations): ' + data);
            });
    }
});

router.delete('/:id',function (req, res) {

});

router.post('/admin/:id', function (req, res) {
    let organizations = new Organizations;
    if (req.body) {
        if (req.body.id) {
            //update
            let orgsForUpdate = req.body;
            orgsForUpdate.imgURL = imageURL;
            organizations.updateOrganization(JSON.stringify(orgsForUpdate)).then(data=>{
                res.send(data);
            });
        } else {
            //create
            req.body.imgURL = imageURL;
            organizations.addOrganization(JSON.stringify(req.body)).then(data=>{
                res.send(data);
            });
        }
    }
});

router.post('/uploadfile', (req, res) => {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename) {
        imageURL = fieldname + '-' + Date.now() + filename;
        let saveTo = config.folderForFiles+ '/uploads/' + imageURL;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
        res.end('done');
    });
    res.on('close', function() {
        req.unpipe(busboy);
    });
    req.pipe(busboy);
});



module.exports = router;