import express from 'express';
import Redis from 'ioredis';

const app =  express();

app.use(express.json());

//queue : is used to store the list of items in the order they were added and can be retrieved in the same order (FIFO - First In First Out)

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const QUEUE_NAME = 'queue:emails';


app.post('/enqueue', async (req, res) => {
    const job = {
        to: req.body.to,
        subject : req.body.subject || "No Subect",
        body : req.body.body || "No Body",
        createdAt : new Date().toISOString()
        
    }
    // .lpush() , .rpush() lpush adds the item to the left end of the list and rpush adds the item to the right end of the list

    await redis.lpush(QUEUE_NAME, JSON.stringify(job));
    res.status(201).json({ message: 'Email enqueued successfully' , job });
});

app.get('/queue', async (req, res) => {
    // .lrange() is used to get the range of items from the list, 0 is the start index and -1 is the end index (get all items)
    // lrange(Key,start index , end index)
    const jobs = await redis.lrange(QUEUE_NAME, 0, -1);
    res.status(200).json({ jobs: jobs.map(job => JSON.parse(job)) });
});


app.delete('/dequeue', async (req, res) => {
    const job = await redis.rpop(QUEUE_NAME);
    if(!job) {
        return res.status(404).json({message: 'No email to dequeue'});
    }

    res.status(200).json({message: 'Email dequeued successfully' , job : JSON.parse(job)});
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});