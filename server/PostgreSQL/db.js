// This file will create a connection to the Postgres database
require('dotenv')
var { Pool, Client } = require('pg');

// Provide connection string
var pool = new Pool({
  user: 'ubuntu',
  password: process.env.PG_PASSWORD,
  database: 'overview',
  host: process.env.PG_HOST,
  port: 5432
})

// Connect database
pool.connect();

module.exports = pool;