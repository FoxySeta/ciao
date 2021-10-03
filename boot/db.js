// boot/db.js: database initialization

const db = require('../db');

module.exports = () => {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Users ( \
      email TEXT UNIQUE, \
      password BLOB, \
      salt BLOB, \
      name TEXT, \
      qrcode BLOB \
    )");
  });
};
