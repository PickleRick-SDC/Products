require('dotenv').config();
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());


// import routers
var routerSQL = require('./PostgreSQL/routesSQL.js')
app.use('/pickleRick', routerSQL);

app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => { res.status(200).send(process.env.LOADER_IO_KEY)} );

var PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`You are now listening to ${PORT}`);