// db.js: database access

const Database = require('sqlite3').Database;

module.exports = new Database('db.sqlite3');
