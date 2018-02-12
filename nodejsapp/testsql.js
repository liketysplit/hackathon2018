var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
{
  userName: 'testCase', // update me
  password: 'quHgJan8sox0xiA3', // update me
  server: 'vsuhackathon.database.windows.net', // update me
  options:
     {
        database: 'hackathon' //update me
        , encrypt: true
     }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
   {
     if (err)
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          "select c.CustomerId, c.FirstName, c.LastName, c.Company, c.Email FROM Customer AS c ORDER BY c.CustomerId ASC;",
             function(err, rowCount, rows)
                {
                    console.log(rowCount + ' row(s) returned' + result);
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }
