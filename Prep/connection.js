const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('../sqlite/chinook.db');

let sql = `SELECT DISTINCT CustomerId, FirstName, LastName, Company FROM CUSTOMERS ORDER BY CustomerId`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.CustomerId, row.FirstName, row.LastName, row.Company);
  });
});

// close the database connection
db.close();
