const express = require('express');
const News = require('../utils/News');
const NewsQueues = require('../queues/NewsQueues');
const bodyParser = require('body-parser');

let newsQueues = new NewsQueues;
let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//get all or get last {count} news +
router.get('/:id', function (req, res) {
    let news = new News;
    console.log('Get param id: ' + req.params.id);
    if(req.query.count && req.query.offset){
        console.log('Взять последние co сдвигом : ' + req.query.count);
        news.getNewsWithOffset(parseInt(req.query.offset), parseInt(req.query.count)).then(data => {
            res.send(data);
        });
    }else{
        if (req.query.count) {
            console.log('Взять последние: ' + req.query.count);
            news.getLastNews(parseInt(req.query.count)).then(data => {
                res.send(data);
                newsQueues.doResponseNews(req.params.id, data);
            });
        } else {
            news.getAllNews().then(data => {
                res.send(data);
                console.log('Взятые даннаые (getAllNews): ' + data);
                newsQueues.doResponseNews(req.params.id, data);
            });
        }
    }

});

//delete news by id in query +
router.delete('/admin/:id', function (req, res) {
    let news = new News;
    if (req.query.id) {
        news.deleteNews(req.query.id).then(data => {
            if (data) {
                newsQueues.doResponseNews(req.params.id, data);
            } else {
                res.end();
            }
        });

    }
});

//update news or create if not exist +
router.post('/admin/:id', function (req, res) {
    let news = new News;
    if (req.body) {
        if (req.body.id) {
            //update
            news.updateNews(JSON.stringify(req.body)).then(data=>{
                newsQueues.doResponseNews(req.params.id, data);
            });
        } else {
            //create
            news.addNews(JSON.stringify(req.body)).then(data=>{
                newsQueues.doResponseNews(req.params.id, data);
            });
        }
    }
});

module.exports = router;