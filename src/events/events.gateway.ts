import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { RedisClientType } from 'redis';
import { BpmService } from 'src/bpm/bpm.service';
import { AddBpmDto } from 'src/bpm/dto/add-bpm.dto';
import { NewCharData } from './dto/new-char-data.dto';
import { ScanInstructions } from './scanInstructions.interface';

// addresses viene de una db, 100%
// characteristicsInfo podría estar estatico en el server
const scanInstructions: ScanInstructions = {
  addresses: ['8d:55:a6:10:de'],
  characteristicsInfo: [
    {
      listen: true,
      path: ['0xeef', '0xfaa'],
    },
  ],
};

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('REDIS_CLIENT')
    private redis: RedisClientType,
    private bpmService: BpmService,
  ) {}

  @WebSocketServer() server;

  // @SubscribeMessage('new-0xfaa-data')
  // async handleNewBpm(@MessageBody() data: NewCharData): Promise<string> {
  //   const { branchId } = data;
  //   await this.bpmService.addBpm(data);
  //   return 'ok';
  // }

  /**
   * Retrieves instructions and send the order to the base to start scanning
   */
  async handleBaseConnection(client: any) {
    const { branchId } = client.handshake.auth;
    const key = `branch:${branchId}:socket`;
    await this.redis.set(key, client.id);
    console.log(`Saved socket: ${client.id} for branch: ${branchId}`);
    client.emit('start-scan', scanInstructions);
  }

  /**
   * Check credentials
   */
  async handleManagerConnection(client: any) {
    // ..
  }

  async handleConnection(client: any, ...args: any[]) {
    console.log('Connected', client.id, client.handshake.auth);
    const { role } = client.handshake.auth;
    if (role === 'base') {
      this.handleBaseConnection(client);
    } else if (role === 'manager') {
      this.handleManagerConnection(client);
    }
  }

  async handleDisconnect(client: any) {
    console.log('Disconnected', client.id, client.handshake.auth);
    const { role } = client.handshake.auth;
    if (role === 'base') {
      // update status of this branch, check for offline alert
    } else if (role === 'manager') {
      // remove this socket from the listeners of this branch (???)
    }
  }
}
