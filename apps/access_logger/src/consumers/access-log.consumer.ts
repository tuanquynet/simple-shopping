import {repository} from '@loopback/repository';
import {rabbitConsume} from 'loopback-rabbitmq';
import {AccessLog} from '../models';
import {AccessLogRepository} from '../repositories';

// interface Message {
//   createdAt: Date;
//   serviceName: string;
//   url: string;
//   method: string;
//   payload: object;
// }

export class AccessLogConsumer {
  constructor(
    @repository(AccessLogRepository)
    private accessLogRepository: AccessLogRepository,
  ) {
    console.log('AccessLogConsumer');
  }

  @rabbitConsume({
    exchange: 'messaging.direct',
    routingKey: 'access-log',
    queue: 'access-log-queue',
  })
  async handle(message: AccessLog) {
    console.log('AccessLogConsumer 123: ', message);
    try {
      await this.accessLogRepository.create(message);
    } catch (error) {
      console.error(error);
    }
  }
}
