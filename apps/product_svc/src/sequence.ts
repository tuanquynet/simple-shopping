import {inject} from '@loopback/core';
import {FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, RestBindings, Send, SequenceHandler} from '@loopback/rest';
import {RabbitmqBindings, RabbitmqProducer} from 'loopback-rabbitmq';

const SequenceActions = RestBindings.SequenceActions;
// export class MySequence extends MiddlewareSequence {
export class MySequence implements SequenceHandler {
  /**
   * Optional invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  public invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) protected send: Send,
    @inject(SequenceActions.REJECT) protected reject: Reject,
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    private rabbitmqProducer: RabbitmqProducer
  ) {
  //  super(this.invokeMiddleware)
  }

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;

      const route = this.findRoute(request);

      // usually authentication is done before proceeding to parse params
      // but in our case we need the path params to know the provider name
      const args = await this.parseParams(request, route);
      console.log('========');
      console.log(args);
      console.log(request.body);

      const messageData = {
        serviceName: 'product_svc',
        createdAt: new Date(),
        url: request.url,
        method: request.method,
        payload: request.body ?? null,
      }
      await this.rabbitmqProducer.publish(
        'messaging.direct',
        'access-log',
        Buffer.from(JSON.stringify(messageData)),
      );


      // Authentication successful, proceed to invoke controller
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (error) {
      this.reject(context, error);
      return;
    }
  }
}
