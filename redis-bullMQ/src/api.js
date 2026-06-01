//producer
import express from 'express';
import emailQueue from './queue';


const app = express();

app.use(express.json());

app.post("/welcome-email" , async (req, res) => {
    const job = emailQueue.add('welcome-email', {
        to: req.body.to,
        subject: req.body.subject || "Welcome to our service",
    },
{
        attempts: 3, // Retry up to 3 times if the job fails
        backoff: {
            type: 'exponential',
            delay: 5000, // Initial delay of 5 seconds before retrying
        },
});   
   res.status(201).json({ message: 'Welcome email job added to the queue', jobId: job.id });
});


app.listen(3000, () => {
    console.log('Producer server is running on port 3000');
});