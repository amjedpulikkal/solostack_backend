import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379' 
});

export const connectReds = () => {
  client.connect();
}

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

export const redisDb = client;


