import { Module } from '@nestjs/common';
import { BpmModule } from 'src/bpm/bpm.module';
import { redisProviders } from 'src/redis.providers';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, ...redisProviders],
  imports: [BpmModule],
})
export class EventsModule {}
