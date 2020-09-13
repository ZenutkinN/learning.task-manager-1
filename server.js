const express = require('express');

const Database = require('./database');
const app = require('./app');

const server = express();

const database = new Database('mongodb://localhost:27017');
database.connect('express-notes');

database.on('connect', () => {
  console.log('Database connection established');
});
database.on('disconect', () => {
  console.log('Database connection interrupted');
});

server.database = database;

server.use(express.static('public'));
server.use('/lib', express.static('node_modules'));
server.use(app);

server.listen(3000, () => console.log('Server is starting on http://localhost:3000'));

process.on('SIGINT', () => {
  database.close().then(() => process.exit(0));
});
