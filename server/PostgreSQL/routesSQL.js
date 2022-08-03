// These routers will handle the request made from the clients and send a response back
var routerSQL = require('express').Router();
var models = require('./models.js');

routerSQL.get('/products', (request, response) => {
  var { count, page } = request.query;
  var page = page - 1;

  if (!count) {count = 5};
  if (!page) {page = 0};

  var getAllProducts = async () => {
    var results = await models.getAllProducts(count, page);
    try { response.status(200).send(results) }
    catch(error) { console.log('There is an error in retrieving all of the products') }
  };
  getAllProducts();
});

routerSQL.get('/products/:id', (request, response) => {
  var getProductInfo = async () => {
    var results = await models.getProductInfo(request.params.id);
    try { response.status(200).send(results) }
    catch(error) { console.log('Error in getting product info from server side') }
  };
  getProductInfo();
});

routerSQL.get('/products/:product_id/related', (request, response) => {
  var getRelatedProducts = async () => {
    var results = await models.getRelatedProducts(request.params.product_id)
    try { response.status(200).send(results) }
    catch (error) { console.log('Error in retrieving related products from server side')}
  };
  getRelatedProducts();
});

routerSQL.get('/products/:id/styles', (request, response) => {
  var getProductStyles = async () => {
    var results = await models.getProductStyles(request.params.id);
    try { response.status(200).send(results) }
    catch(error) { console.log('Error in getting product styles from server side') }
  };
  getProductStyles();
});

module.exports = routerSQL