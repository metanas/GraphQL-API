import Redis from 'ioredis';

export const redis = new Redis();

redis.on('error', error => {
  console.error(error);
});
