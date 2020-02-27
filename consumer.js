const amqp = require("amqplib"); 

const port = 5672;
const server = "localhost";
connectConsumer();
async function connectConsumer() {
    try {
        const connection = await amqp.connect(`amqp://${server}:${port}`);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //verifies you have a queue
        console.log("Waiting for messages...");
        channel.consume("jobs", message => {
            const input = message.content.toString();
            console.log(`Received job with input: ${JSON.parse(input).number}`);
        });

    } catch (e) {
        console.log(e);
    }   
}