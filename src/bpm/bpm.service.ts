import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AddBpmDto } from './dto/add-bpm.dto';

@Injectable()
export class BpmService {
  constructor(
    @Inject('REDIS_CLIENT')
    private redis: RedisClientType,
  ) {}

  async addBpm({ macAddress, bpm }: AddBpmDto): Promise<void> {
    const key = `band:${macAddress}:bpm`;
    const { microseconds } = await this.redis.time();
    await this.redis.zAdd(key, { value: bpm, score: microseconds });
  }
}
