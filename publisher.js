const amqp = require('amqplib');
const msg = { numbers: Number(process.argv[2]) };

console.log(process.argv);

connect();
async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const result = await channel.assertQueue('jobs');

    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
    console.log(`Jobs sent successfully ${msg.numbers}`);
  } catch (error) {
    console.error(error);
  }
}
