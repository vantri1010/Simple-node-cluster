const amqp = require("amqplib");

async function consumeMessages() {
    try {
        const connection = await amqp.connect("amqp://127.0.0.1:5672");
        const channel = await connection.createChannel();

        const queueName = "FabSeries1";

        await channel.assertQueue(queueName, { durable: false });
        await channel.consume(queueName, message => {
            console.log(`Received message: ${message.content.toString()}`);
        }, { noAck: true });

        console.log(`Waiting for messages in queue ${queueName}`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

consumeMessages();
