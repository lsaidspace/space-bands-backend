import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { redisProviders } from './redis.providers';
import { BpmModule } from './bpm/bpm.module';
import { BranchesModule } from './branches/branches.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EventsModule,
    BpmModule,
    BranchesModule,
    MongooseModule.forRoot('mongodb+srv://lsaid:GodView2022@cluster0.51gui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, ...redisProviders],
})
export class AppModule {}
