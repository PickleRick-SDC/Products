// These routers will handle the request made from the clients and send a response back
var routerSQL = require('express').Router();
var models = require('./models.js');

routerSQL.get('/products', (request, response) => {
  var getAllProducts = async () => {
    var results = await models.getAllProducts();
    var smallResults = results.slice(0, 1500)
    try {
      response.status(200).send(smallResults)
    } catch(error) {
      console.log('There is an error in retrieving all of the products')
    }
  };

  getAllProducts();
});

routerSQL.get('/:id', (request, response) => {

  var getProductInfo = async () => {
  var results = await models.getProductInfo(request.params.id);

    try {
      response.status(200).send(results)
    } catch(error) {
      console.log('Error in getting product info from server side')
    }
  };

  getProductInfo();
});
module.exports = routerSQL