// db.js: database access

const Database = require('sqlite3').Database;

module.exports = new Database('database.sqlite3', err => {
  if (err)
    console.error(err.message);
});
