// boot/db.js: database initialization

const db = require('../db');

module.exports = () => {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Users ( \
      email TEXT PRIMARY KEY, \
      password BLOB, \
      salt BLOB, \
      name TEXT, \
      qrcode TEXT \
      )");
    db.run("CREATE TABLE IF NOT EXISTS Friendships ( \
      id INTEGER PRIMARY KEY, \
      user_email1 TEXT, \
      user_email2 TEXT, \
      FOREIGN KEY (user_email1) REFERENCES Users (email), \
      FOREIGN KEY (user_email2) REFERENCES Users (email) \
    )");
  });
};
