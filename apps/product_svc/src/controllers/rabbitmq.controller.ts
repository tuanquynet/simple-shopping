import {inject} from '@loopback/core';
import {
  get, param, response
} from '@loopback/rest';
import {
  RabbitmqBindings,
  RabbitmqProducer
} from 'loopback-rabbitmq';



export class RabbitController {
  constructor(
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    private rabbitmqProducer: RabbitmqProducer
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
      Buffer.from(JSON.stringify({name: 'loopback-rabbitmq-example', date: new Date()})),
    );

    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'test rabbitmq',
      date: new Date(),
      // url: this.req.url,
      // headers: Object.assign({}, this.req.headers),
    };
  }

}
