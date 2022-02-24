import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Branch, BranchWithRelations} from './branch.model';
import {Category, CategoryWithRelations} from './category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
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
      pattern: '#[0-9A-F]{6}$',
      errorMessage: 'Invalid color.',
    },
  })
  color?: string;

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

  @belongsTo(() => Category)
  categoryId: string;

  @belongsTo(() => Branch)
  branchId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
  category?: CategoryWithRelations;
  branch?: BranchWithRelations;
}

export type ProductWithRelations = Product & ProductRelations;
