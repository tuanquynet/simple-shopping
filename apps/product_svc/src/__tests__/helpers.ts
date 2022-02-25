import {Product} from '../models';

/**
 * Generate a complete Todo object for use with tests.
 * @param todo - A partial (or complete) Todo object.
 */
export function givenProduct(product?: Partial<Product>) {
  const data = Object.assign(
    {
      name: 'do a thing',
      price: 10,
      color: '#070707',
      categoryId: '6217163b43cdc079a9d40554',
      branchId: '6217090a61d2d771d3eeffe4',
    },
    product,
  );
  return new Product(data);
}

export function givenProductWithoutId(
  product?: Partial<Product>,
): Omit<Product, 'id'> {
  return givenProduct(product);
}
