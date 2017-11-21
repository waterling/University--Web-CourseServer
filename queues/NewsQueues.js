'use strict';

const amqp = require('amqplib/callback_api');


class NewsQueues {

    doResponseNews(orderId, data) {

        amqp.connect('amqp://localhost', function (err, conn) {

            conn.createChannel(function (err, ch) {

                const qName = 'news_' + orderId;


                ch.assertQueue(qName, {durable: false, autoDelete: true});


                ch.sendToQueue(qName, new Buffer(JSON.stringify(data)));

                console.log(" [x] Sent 'Data from News!'");

            })

        });

    };


}


module.exports = NewsQueues;