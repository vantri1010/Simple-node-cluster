const rq = require("amqplib");

rq.connect("amqp://192.168.1.4:5672", (err, connection) => {
    if (err) { process.exit(); }
    else {
        const queueName = "FabSeries2";
        connection.createChannel((err, channel) => {
            channel.assertQueue(queueName, { durable: false });
            channel.consume(queueName, message => {
                console.log(`Waiting for messages`);
                console.log(`${queueName} - ${message.content.toString()}`);
            }, { noAck: true });
        });
    }
});