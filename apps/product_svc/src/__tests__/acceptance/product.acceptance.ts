import {Client, expect} from '@loopback/testlab';
import {ProductSvcApplication} from '../..';
import {setupApplication} from './test-helper';

xdescribe('Product API', () => {
  let app: ProductSvcApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('Create a new product', async () => {
    await client
      .post('/products')
      .send({
        name: 'p01',
        branchId: '6217163b43cdc079a9d40554',
        categoryId: '6217090a61d2d771d3eeffe4',
        price: 1,
        color: '#070707',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Update a product', async () => {
    const givenProduct = {
      name: 'p02',
      branchId: '6217163b43cdc079a9d40554',
      categoryId: '6217090a61d2d771d3eeffe4',
      price: 1,
      color: '#070707',
    };
    const response1 = await client
      .post('/products')
      .send(givenProduct)
      .set('Accept', 'application/json')
      .expect(200);

    await client
      .patch(`/products/${response1.body.id}`)
      .send({
        ...givenProduct,
        name: 'newname',
      })
      .set('Accept', 'application/json')
      .expect(204);

    const response2 = await client
      .get(`/products/${response1.body.id}`)
      .set('Accept', 'application/json')
      .expect(200);
    expect(response2.body.name).equal('newname');
  });

  it('Delete a product', async () => {
    const givenProduct = {
      name: 'p03',
      branchId: '6217163b43cdc079a9d40554',
      categoryId: '6217090a61d2d771d3eeffe4',
      price: 1,
      color: '#070707',
    };
    const response1 = await client
      .post('/products')
      .send(givenProduct)
      .set('Accept', 'application/json')
      .expect(200);

    await client
      .del(`/products/${response1.body.id}`)
      .set('Accept', 'application/json')
      .expect(204);

    await client
      .get(`/products/${response1.body.id}`)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('Get a product', async () => {
    const givenProduct = {
      name: 'p02',
      branchId: '6217163b43cdc079a9d40554',
      categoryId: '6217090a61d2d771d3eeffe4',
      price: 1,
      color: '#070707',
    };
    const response1 = await client
      .post('/products')
      .send(givenProduct)
      .set('Accept', 'application/json')
      .expect(200);

    const response2 = await client
      .get(`/products/${response1.body.id}`)
      .set('Accept', 'application/json')
      .expect(200);
    expect(response2.body.id).equal(response1.body.id);
  });

  it('Filter list of product by name', async () => {
    const newName = `filtered${Date.now()}`;
    const givenProduct = {
      name: newName,
      branchId: '6217163b43cdc079a9d40554',
      categoryId: '6217090a61d2d771d3eeffe4',
      price: 1,
      color: '#070707',
    };
    const response1 = await client
      .post('/products')
      .send(givenProduct)
      .set('Accept', 'application/json')
      .expect(200);

    const filter = {
      where: {
        name: newName,
      },
    };
    const response2 = await client
      .get(`/products?filter=${JSON.stringify(filter)}`)
      .set('Accept', 'application/json')
      .expect(200);

    expect(response2.body[0].id).equal(response1.body.id);
  });

  it('Get list of product sorted by name', async () => {
    const newName = `shorted-${Date.now()}`;
    const givenProduct = {
      name: `${newName}-01`,
      branchId: '6217163b43cdc079a9d40554',
      categoryId: '6217090a61d2d771d3eeffe4',
      price: 10,
      color: '#070707',
    };
    await Promise.all([
      await client
        .post('/products')
        .send(givenProduct)
        .set('Accept', 'application/json')
        .expect(200),
      await client
        .post('/products')
        .send({
          ...givenProduct,
          name: `${newName}-02`,
          price: 20,
        })
        .set('Accept', 'application/json')
        .expect(200),
    ]);

    const filter = {
      where: {
        name: {
          like: `${newName}.*`,
        },
      },
      order: 'price DESC',
    };
    const response3 = await client
      .get(`/products?filter=${JSON.stringify(filter)}`)
      .set('Accept', 'application/json')
      .expect(200);

    expect(response3.body[0].price).equal(20);
  });
});
