const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'shery#99999',
  database: 'authentication',
};

const dbConnection =
  mysql.createPool(dbConfig);

module.exports = dbConnection.promise()