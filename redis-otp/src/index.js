import express from "express"
import Redis from "ioredis"

const app = express();

//middleware to parse json bodies
app.use(express.json());

const redis  = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const OTP_KEY_PREFIX = 'otp:';

app.post('/otp', async (req, res)=>
{
    const { phoneNumber} = req.body;

    if(!phoneNumber)
    {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    console.log(`Generated OTP for ${phoneNumber}: ${otp}`); // Log OTP for testing purposes

    try{
        await redis.set(OTP_KEY_PREFIX + phoneNumber, otp, 'EX', 30); // Store OTP with 30 seconds expiration
        return res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch(error)
    {
        return res.status(500).json({ error: 'Failed to send OTP' });
    }
})


app.post('/otp/verify', async (req, res) => {
    const {phoneNumber , otp} = req.body
    if(!phoneNumber || !otp)
    {
        return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    try{
        const storedOtp = await redis.get(OTP_KEY_PREFIX + phoneNumber);
        if(storedOtp === otp)
        {
            await redis.del(OTP_KEY_PREFIX + phoneNumber); // Delete OTP after successful verification
            return res.status(200).json({ message: 'OTP verified successfully' });
        }
        else
        {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
    }
    catch(error)
    {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Failed to verify OTP' });
    }
})


//how to get the ttl
app.get('/otp/:phoneNumber/ttl', async (req, res) => {
    const { phoneNumber } = req.params;
    const ttl = await redis.ttl(OTP_KEY_PREFIX + phoneNumber);
    res.json({ ttl });

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})