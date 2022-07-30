// This file will create a connection to the Postgres database
require('dotenv')
var { Pool, Client } = require('pg');

// Provide connection string
var pool = new Pool({
  user: 'jasperbucad',
  password: process.env.PG_PASSWORD,
  database: 'overview',
  host: 'localhost',
  port: 5432
})

// Connect database
pool.connect();

module.exports = pool;