import { Module } from '@nestjs/common';
import { redisProviders } from 'src/redis.providers';
import { BpmService } from './bpm.service';

@Module({
  providers: [...redisProviders, BpmService],
  exports: [BpmService],
})
export class BpmModule {}
