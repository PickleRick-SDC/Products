var chakram = require('chakram');
  expect = chakram.expect;

describe ('ProductStyle API', () => {
  var getProductStyleAPI;

  before( async () => {
    getProductStyleAPI = await chakram.get('http://localhost:3001/pickleRick/products/1/styles');
    return getProductStyleAPI
  });

  it('should return 200 on success', () => {
    expect(getProductStyleAPI).to.have.status(200);
  });

  it('should return the productStyle properties on success', () => {
    expect(getProductStyleAPI.body).to.have.keys(['product_id', 'results']);
  });
});

describe ('Product API', () => {
  var getProductAPI;

  before( async () => {
    getProductAPI = await chakram.get('http://localhost:3001/pickleRick/products?count=5&page=1');
    return getProductAPI;
  });

  it('should return 200 on success', () => {
   return expect(getProductAPI).to.have.status(200)
  });

  it('should return an array of 5 products on success', async () => {
    return expect(getProductAPI.body).to.have.lengthOf(5);
  });
});

describe ('ProductInfo API', () => {
  var getProductInfoAPI;

  before( async () => {
    getProductInfoAPI = await chakram.get('http://localhost:3001/pickleRick/products/1');
    return getProductInfoAPI
  });

  it('should return 200 on success', ()=> {
    return expect(getProductInfoAPI).to.have.status(200)
  });

  it('should return the name of the product "Camo Onesie" on success', () => {
    return expect(getProductInfoAPI.body.name).to.equal('Camo Onesie');
  });
});

describe ('Related Products API', () => {
  var getRelatedProductsAPI;

  before( async ()=> {
    getRelatedProductsAPI = await chakram.get('http://localhost:3001/pickleRick/products/1/related');
    return getRelatedProductsAPI
  });

  it('should return 200 on success', () => {
    expect(getRelatedProductsAPI).to.have.status(200);
  });

  it('should return an array of related products on success', () => {
    expect(getRelatedProductsAPI.body).to.eql([2, 3, 8, 7]);
  });
});