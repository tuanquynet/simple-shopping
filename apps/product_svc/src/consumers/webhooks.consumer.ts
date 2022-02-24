import {ConsumeMessage, rabbitConsume} from 'loopback-rabbitmq';

interface Message {
  action: string;
  tenantId?: number;
  payload: object;
}

export class WebhooksConsumer {
  constructor() {}

  @rabbitConsume({
    exchange: 'messaging.direct',
    routingKey: 'tenant.webhook',
    queue: 'webhooks',
  })
  async handle(message: Message, rawMessage: ConsumeMessage) {
    console.log('WebhooksConsumer: ', message);
  }
}
