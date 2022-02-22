import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 200,
      errorMessage: 'name must be less than 200 characters',
    },
  })
  name: string;

  @property({
    type: 'string',
    default: null,
    jsonSchema: {
      pattern: '#[1-9A-F]{6}$',
      errorMessage: 'Invalid color.',
    },
  })
  color?: string;

  @property({
    type: 'string',
    required: true,
  })
  branchId: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;


  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
