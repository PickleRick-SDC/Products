-- GET All products: Remove related products column
-- GET product info: Remove related products, join products and product features table
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(80),
  slogan VARCHAR(250),
  description VARCHAR(500),
  category VARCHAR(80),
  default_price VARCHAR(50)
);

CREATE TABLE product_features (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  feature VARCHAR(60),
  value VARCHAR(60)
);

-- GET product styles: merge product style and product style sku tables
CREATE TABLE product_styles (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  "name" VARCHAR(50),
  sale_price VARCHAR,
  original_price VARCHAR,
  "default" Boolean
);

CREATE TABLE product_skus (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INTEGER,
  size VARCHAR(10),
  quantity INTEGER
);

CREATE TABLE product_photos (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INTEGER,
  url VARCHAR(800),
  thumbnail_url TEXT
);

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  related_product_id INTEGER
);

ALTER TABLE product_features ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE product_styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE product_skus ADD FOREIGN KEY (style_id) REFERENCES product_styles (id);
ALTER TABLE product_photos ADD FOREIGN KEY (style_id) REFERENCES product_styles (id);
ALTER TABLE related_products ADD FOREIGN KEY (product_id) REFERENCES products (id);

\COPY products FROM './csvFiles/product.csv' Header csv delimiter ',';
\COPY product_styles FROM './csvFiles/styles.csv' header csv delimiter ',';
-- \COPY product_styles FROM '../csvFiles/styles.csv' delimiter ',' CSV quote '"' NULL 'null';
\COPY product_features FROM './csvFiles/features.csv' header csv delimiter ',';
\COPY related_products FROM './csvFiles/related.csv' header csv delimiter ',';
\COPY product_skus FROM './csvFiles/skus.csv' header csv delimiter ',';
\COPY product_photos FROM  './csvFiles/photos.csv'  header csv delimiter ',';

UPDATE product_styles SET sale_price = replace(sale_price, 'null', '0');

CREATE INDEX index_related_product_id ON related_products(related_product_id);
CREATE INDEX indie_product_id ON product_features(product_id);
CREATE INDEX product_id_index ON product_styles(product_id);
CREATE INDEX index_id ON product_styles(id);
CREATE INDEX index_style_id ON product_photos(style_id);
CREATE INDEX indie_style_id ON product_skus(style_id);
