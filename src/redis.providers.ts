import { createClient } from 'redis';

export const redisProviders = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const client = createClient({
        url: 'redis://127.0.0.1:6379',
      });
      client.on('connect', () => console.log('REDIS CONNECTED'));
      client.on('error', (err) => {
        console.log('Redis Client Error', err);
      });
      await client.connect();
      return client;
    },
  },
];
