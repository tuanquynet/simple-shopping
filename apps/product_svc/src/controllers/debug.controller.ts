import {inject} from '@loopback/core';
import {
  post,
  Request,
  response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const DEBUG_RESPONSE: ResponseObject = {
  description: 'Debug Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'DebugResponse',
        properties: {
          done: {type: 'string'},
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class DebugController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/throw')
  @response(200, DEBUG_RESPONSE)
  throwException() {
    throw new Error('Unknown error');
  }
}
