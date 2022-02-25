import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ProductController} from '../../../controllers';
import {Product} from '../../../models';
import {ProductRepository} from '../../../repositories';
import {givenProduct} from '../../helpers';

describe('ProductController', () => {
  let productRepo: StubbedInstanceWithSinonAccessor<ProductRepository>;

  let controller: ProductController;
  let aProduct: Product;
  let aProductWithId: Product;
  let aChangedProduct: Product;
  let aListOfProducts: Product[];

  beforeEach(resetRepositories);

  describe('create product', () => {
    it('creates a Product', async () => {
      const create = productRepo.stubs.create;
      create.resolves(aProduct);
      const result = await controller.create(aProduct);
      aProduct.id = result.id;
      expect(result).to.eql(aProduct);
      sinon.assert.calledWith(create, aProduct);
    });
  });

  describe('find product by id', () => {
    it('returns a product if it exists', async () => {
      const findById = productRepo.stubs.findById;
      findById.resolves(aProductWithId);
      const result = await controller.findById(aProductWithId.id as string);
      expect(result).to.eql(aProductWithId);
      sinon.assert.calledWith(findById, aProductWithId.id);
    });
  });

  describe('find products', () => {
    it('returns multiple product if they exist', async () => {
      const find = productRepo.stubs.find;
      find.resolves(aListOfProducts);
      expect(await controller.find()).to.eql(aListOfProducts);
      sinon.assert.called(find);
    });

    it('returns empty list if no products exist', async () => {
      const find = productRepo.stubs.find;
      const expected: Product[] = [];
      find.resolves(expected);
      expect(await controller.find()).to.eql(expected);
      sinon.assert.called(find);
    });
  });

  describe('replace product', () => {
    it('successfully replaces existing items', async () => {
      const replaceById = productRepo.stubs.replaceById;
      replaceById.resolves();
      await controller.replaceById(
        aProductWithId.id as string,
        aChangedProduct,
      );
      sinon.assert.calledWith(replaceById, aProductWithId.id, aChangedProduct);
    });
  });

  describe('update product', () => {
    it('successfully updates existing items', async () => {
      const updateById = productRepo.stubs.updateById;
      updateById.resolves();
      await controller.updateById(aProductWithId.id as string, aChangedProduct);
      sinon.assert.calledWith(updateById, aProductWithId.id, aChangedProduct);
    });
  });

  describe('deleteTodo', () => {
    it('successfully deletes existing items', async () => {
      const deleteById = productRepo.stubs.deleteById;
      deleteById.resolves();
      await controller.deleteById(aProductWithId.id as string);
      sinon.assert.calledWith(deleteById, aProductWithId.id);
    });
  });

  function resetRepositories() {
    productRepo = createStubInstance(ProductRepository);
    aProduct = givenProduct();
    aProductWithId = givenProduct({
      id: '6217163b43cdc079a9d40554',
    });
    aListOfProducts = [
      aProductWithId,
      givenProduct({
        id: '6217ad9e4c302422528a8609',
        name: 'New product 02',
      }),
    ] as Product[];
    aChangedProduct = givenProduct({
      id: aProductWithId.id,
      name: 'New product',
    });

    controller = new ProductController(productRepo);
  }
});
