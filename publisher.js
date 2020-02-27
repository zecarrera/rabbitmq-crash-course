const amqp = require("amqplib"); //amqp - advanced message queue protocol

const port = 5672;
const server = "localhost";
const message = {number:2};
connect();
async function connect() {
    try {
        const connection = await amqp.connect(`amqp://${server}:${port}`);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //verifies you have a queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log(`job sent successfully ${message.number}`);
    } catch (e) {
        console.log(e);
    }   
}