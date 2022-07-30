// These functions will retrieve data from the db AND format it exactly how it looks on Learn.

// Import the pgPool
var pool = require('./db.js');

var getAllProducts = async (count, page) => {
  var offset = page * count;
  var results = await pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${offset}`);
  return results.rows;
  pool.end();
};

var getProductInfo = async (id) => {
  var queryString = `SELECT json_build_object(
    'id', ${id},
    'name', p.name,
    'slogan', p.slogan,
    'description', p.description,
    'category', p.category,
    'default_price', p.default_price,
    'features', json_agg(json_build_object(
      'feature', r.feature,
      'value', r.value)))
    FROM products p
    LEFT JOIN product_features r ON p.id = r.product_id
    WHERE p.id = ${id}
    GROUP BY p.name, p.slogan, p.description, p.category, p.default_price`;
  var results = await pool.query(queryString);
  return results.rows[0].json_build_object;
  pool.end();
};


var getProductStyles = async (id) => {  // p = style r = photos q = skus
  var queryString = `SELECT
  id AS product_id,
  (SELECT json_agg(json_build_object(
  'style_id', p.id,
  'name', p.name,
  'original_price', p.original_price,
  'sale_price', p.sale_price,
  'default?', p.default,
  'photos', (SELECT json_agg(json_build_object('thumbnail_url', r.thumbnail_url, 'url', r.url))
  FROM product_photos r
  WHERE p.id = r.style_id),
  'skus', (SELECT json_object_agg(q.id, json_build_object('quantity', q.quantity, 'size', q.size))
  FROM product_skus q
  WHERE q.style_id = p.id)
  ))
  AS results
  FROM product_styles p
  WHERE p.product_id = ${id}
  )
  FROM products
  WHERE id = ${id}`
  var results = await pool.query(queryString)
  return results.rows[0];
  pool.end()
};

var getRelatedProducts = async(id) => {
  var queryString = `SELECT
   json_agg(related_product_id)
   FROM related_products
   WHERE product_id = ${id}`
  var relatedProducts = await pool.query(queryString);
  return relatedProducts.rows[0].json_agg;
  pool.end();
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProductInfo = getProductInfo;
module.exports.getProductStyles = getProductStyles;
module.exports.getRelatedProducts = getRelatedProducts;