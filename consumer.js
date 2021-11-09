const amqp = require('amqplib');

connect();

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    channel.consume('jobs', (msg) => {
      const input = JSON.parse(msg.content);
      console.log(input);
      if (input.numbers == process.argv[2]) {
        channel.ack(msg);
        console.log('acknowledgment');
      }
    });

    console.log('waiting for messages');
  } catch (error) {
    console.error(error);
  }
}
