// These functions will retrieve data from the db AND format it exactly how it looks on Learn.

// Import the pgClient
var client = require('./db.js');

var getAllProducts = async (count, page) => { // needs reformating with params of count/page
  var offset = page * count

  var results = await client.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${offset}`);

  return results.rows;

  client.end();
};

var getProductInfo = async (id) => {
  var results; // An object

  // Grab the main summary of the product data
  var productInfoData = await client.query(`SELECT * FROM products where id = ${id}`);
  results = productInfoData.rows[0];

  results['features'] = [];

  // Grab all of the features
  var productFeatures = await client.query(`SELECT * FROM product_features where product_id = ${id}`); // An array of objects

  // Iterate through the array of each feature array and delete product id and id
  productFeatures.rows.forEach((feature) => {
    delete feature['id'];
    delete feature['product_id']
    results.features.push(feature)
  })


  return results
  client.end();
};

var getProductStyles = async (id) => {
  var test = await client.query(`SELECT row_to_json(product_styles) FROM (SELECT name, sale_price, original_price) AS product_styles where id = ${id}`)

  return test.rows;
  client.end();
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProductInfo = getProductInfo;
module.exports.getProductStyles = getProductStyles;