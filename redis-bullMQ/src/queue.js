import {Queue} from 'bullmq';

export const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

const emailQueue = new Queue('email', { connection });

export default emailQueue;