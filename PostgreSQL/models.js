// These functions will retrieve data from the db AND format it exactly how it looks on Learn.

// Import the pgClient
var client = require('./db.js');

var getAllProducts = async (count, page) => {
  var offset = page * count;
  var results = await client.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${offset}`);
  return results.rows;
  client.end();
};

var getProductInfo = async (id) => {
  var results = await client.query(`SELECT json_agg(name) FROM product_features group by id where id = ${id} limit 5`)

  return results.rows
  client.end();
};

var getProductStyles = async (id) => {

};

var getRelatedProducts = async(id) => {
  var relatedProducts = await client.query(`SELECT json_agg(related_product_id) FROM related_products WHERE product_id = ${id}`);
  return relatedProducts.rows[0].json_agg;
  client.end();
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProductInfo = getProductInfo;
module.exports.getProductStyles = getProductStyles;
module.exports.getRelatedProducts = getRelatedProducts;




// var getProductInfo = async (id) => {
//   var results = await client.query(`SELECT json_build_object(
//                                               'id', ${id},
//                                               'name', p.name,
//                                               'slogan', p.slogan,
//                                               'description', p.description,
//                                               'category', p.category,
//                                               'default_price', p.default_price
//                                             )
//                                             FROM products p
//                                             WHERE p.id = ${id}
//                                          `)

//   return results.rows[0].json_build_object;
//   client.end();
// };