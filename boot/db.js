// boot/db.js: database initialization

import {serialize, run} from '../db';

export default function () {
  serialize(function () {
    run(
      `CREATE TABLE IF NOT EXISTS Users (
        username TEXT UNIQUE,
        password BLOB,
        salt BLOB,
        name TEXT,
        qrcode BLOB
      )`
    );
  });
};
