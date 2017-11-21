var amqp = require('amqplib/callback_api');
var NewsDefenition = require('./defenitions/NewsDefenition');


amqp.connect('amqp://localhost', function(err, conn) {

  conn.createChannel(function(err, ch) {

    var q = 'rpc_queue';



    ch.assertQueue(q, {durable: false});

    ch.prefetch(1);

    console.log(' [x] Awaiting RPC requests');

    ch.consume(q, function reply(msg) {

      var n = msg.content.toString();
      console.log(n);
      try{
      	req = JSON.parse(n);
      console.log(req);
		news = new NewsDefenition();
		console.log(req.argument);

		news.addInTable('{"title": "Title", "content": "Some content", "imgURL":"imgURL"}');
		res="text";
      console.log(news.getFromTable(req.argument));
  }catch(err){
  	console.log(err);
  	res='error';
  }
      

      ch.sendToQueue(msg.properties.replyTo,

        new Buffer(res),

        {correlationId: msg.properties.correlationId});

      ch.ack(msg);

    });

  });

});



function fibonacci(n) {

  if (n === 0 || n === 1)

    return n;

  else

    return fibonacci(n - 1) + fibonacci(n - 2);

}