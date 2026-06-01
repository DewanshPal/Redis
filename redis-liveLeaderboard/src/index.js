import express from 'express';
import Redis from 'ioredis';

const app = express();

app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

//Redis sorted set key for the leaderboard
const LEADERBOARD_KEY = 'game_leaderboard';

