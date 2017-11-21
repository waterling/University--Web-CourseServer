'use strict';

const amqp = require('amqplib/callback_api');


class OrganizationsQueues {

    doResponseOrganizations(osId, data) {

        amqp.connect('amqp://localhost', function (err, conn) {

            conn.createChannel(function (err, ch) {

                const qName = 'org_' + osId;


                ch.assertQueue(qName, {durable: false, autoDelete: true});

                ch.sendToQueue(qName, new Buffer(JSON.stringify(data)));


            })

        });

    };


}


module.exports = OrganizationsQueues;