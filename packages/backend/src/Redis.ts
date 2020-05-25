import * as Redis from 'ioredis';
import { $log } from '@tsed/common';

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
  lazyConnect: true,
});

export async function createRedisConnection() {
  await redis.connect();

  $log.info('Connected to redis');
}
