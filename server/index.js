require('dotenv').config();
var express = require('express');

var app = express();
app.use(express.json());


var PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`You are now listening to ${PORT}`);