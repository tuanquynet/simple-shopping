import {inject} from '@loopback/core';
import {get, param, Request, response, RestBindings} from '@loopback/rest';
import {RabbitmqBindings, RabbitmqProducer} from 'loopback-rabbitmq';

export class RabbitController {
  constructor(
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    private rabbitmqProducer: RabbitmqProducer,
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) {
    console.log('construct RabbitController');
  }

  @get('/test')
  @response(200, {
    description: 'test rabbitmq',
  })
  async test(
    @param.query.string('exchange', {required: false}) exchange?: string,
    @param.query.string('routingKey', {required: false}) routingKey?: string,
  ) {
    await this.rabbitmqProducer.publish(
      exchange ?? 'messaging.direct',
      routingKey ?? 'tenant.webhook',
      Buffer.from(
        JSON.stringify({name: 'loopback-rabbitmq-example', date: new Date()}),
      ),
    );

    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'test rabbitmq',
      date: new Date(),
    };
  }

  @get('/log-access')
  @response(200, {
    description: 'log-access',
  })
  async logAccess() {
    const messageData = {
      serviceName: 'product_svc',
      createdAt: new Date(),
      url: this.request.url,
      method: this.request.method,
      payload: {done: true},
    };
    await this.rabbitmqProducer.publish(
      'messaging.direct',
      'access-log',
      Buffer.from(JSON.stringify(messageData)),
    );

    // Reply with a greeting, the current time, the url, and request headers
    return messageData;
  }
}
