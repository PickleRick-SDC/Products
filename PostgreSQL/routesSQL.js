// These routers will handle the request made from the clients and send a response back
var routerSQL = require('express').Router();
var models = require('./models.js');

routerSQL.get('/products', (request, response) => {
  var findAllProducts = async () => {
    var results = await models.getAllProducts();
    var smallResults = results.slice(0, 1500)
    try {
      response.status(200).send(smallResults)
    } catch(error) {
      console.log('There is an error in retrieving all of the products')
    }
  }

  findAllProducts();
});

module.exports = routerSQL