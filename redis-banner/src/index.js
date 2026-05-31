import express from 'express';
import Redis from 'ioredis';

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const BANNER_KEY = 'app:banner';

app.post('/banner', async (req, res) => {
  try {

    await redis.set(BANNER_KEY , req.body.message || 'Welcome to our application!', 'EX', 30); // Set banner with 30 seconds expiration
    
    res.json({success: true, message: 'Banner updated successfully' });
    
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });

  }
});

app.get('/banner', async (req, res) => {
  try {
    const bannerMessage = await redis.get(BANNER_KEY) || 'No banner set';
    res.json({ message: bannerMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/banner' , async(req,res) => {
    try{
        await redis.del(BANNER_KEY);
        res.json({success:true, message:'Banner deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/banner/exists' , async(req,res) => {
    try{
       const exists =  await redis.exists(BANNER_KEY);
       res.json({exists:exists})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})