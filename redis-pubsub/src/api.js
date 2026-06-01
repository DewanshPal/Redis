import express from 'express';
import Redis from 'ioredis';

const app = express();

app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

//there can be multiple channels, we can subscribe to multiple channels and publish to multiple channels as well
app.post('/notifications', async (req, res) => {
    const message = {
        title: req.body.title || "No title",
        createdAt: new Date().toISOString(),
    };

   const receivers = await publisher.publish("notifications", JSON.stringify(message));
   const receivers2 = await publisher.publish("alerts", JSON.stringify(message));
    res.status(200).send(`Message published successfully to ${receivers} receivers and ${receivers2} receivers`);

});


app.listen(3000, () => {
    console.log('Publisher server is running on port 3000');
});