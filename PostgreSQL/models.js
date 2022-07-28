// These functions will retrieve data from the db AND format it exactly how it looks on Learn.

// Import the pgClient
var client = require('./db.js');

var getAllProducts = async () => {
  var results = await client.query('SELECT * FROM products');
  // client.end()
  return results.rows
};



module.exports.getAllProducts = getAllProducts;