// This file will create a connection to the Postgres database
require('dotenv')
var { Client } = require('pg');

// Provide connection string
var client = new Client({
  user: 'jasperbucad',
  password: process.env.PG_PASSWORD,
  database: 'overview',
  host: 'localhost',
  port: 5432
})

// Connect database
client.connect();

module.exports = client;