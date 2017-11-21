const News = require('./utils/News');

// const news = new News;

const bodyParser = require('body-parser');

const NewsQueues = require('./queues/NewsQueues');

const newsQueues = new NewsQueues;

const charRel =  require('./defenitions/CharactersRelationshipDefinition');

const app = require('./connections/ExpressConnect');



const RESPONSE_TO_CLIENT = 'Ваш запрос обрабатывается';

// app.use(bodyParser.json());

app.get('/news/:orderId', function (req, res) {
    let rel = new charRel;

    res.send(RESPONSE_TO_CLIENT);

    const data = 'data from server';

    let news = new News;
    console.log(news.updateNews('{ "id" : 76, "title": "New Title", "content": "New content", "imgURL": "New imgURL"}'));

    newsQueues.doResponseNews(req.params.orderId, data);

});


app.delete('/news/:newsId',function (req, res) {

});



