import express from 'express';
import Redis from 'ioredis';

const app =  express();

app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


//set : is used to store the single variable
//hset : is used to store the obects then can be updated by the field name
//hgetall : is used to get the all the fields and values of the object(whole object)
//hget,hexists,hdel : is used to get the specific field value, check the field existance and delete the specific field respectively
app.post('/profile/:id/json', async (req, res) => {
    console.log(req.params.id);
    const {name, email } = req.body;
    await redis.set(`profile:${req.params.id}:json`, JSON.stringify({ id: req.params.id, name, email }));
    res.status(201).json({ id: req.params.id, name, email });
});

app.get('/profile/:id/json', async (req, res) => {
    const profileData = await redis.get(`profile:${req.params.id}:json`);
    res.status(200).json({profileData});
});

app.post('/profile/:id/hash', async (req, res) => {
    const {name, email } = req.body;
    await redis.hset(`profile:${req.params.id}:hash`, { id: req.params.id, name, email });
    res.status(201).json({ id: req.params.id, name, email });
});


app.get('/profile/:id/hash', async (req, res) => {
    const profileData = await redis.hgetall(`profile:${req.params.id}:hash`);
    res.status(200).json({profileData});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});