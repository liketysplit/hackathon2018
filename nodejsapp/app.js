const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const app = express(); //express object


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
	res.locals.errors = null;
  res.locals.customers = null;
	next();
});

// Express Validator Middleware
app.use(expressValidator());

// Create connection to database
const config =
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
const connection = new Connection(config);

const sqlStatement = "select FirstName, LastName FROM Customer";
// app.get('/', function(req, res){
//   //if (connectToDB() === true){
//     //var customers = [];
//
//     //customers = connectToDB();
// //console.log('customers data <br/>' + customers);
//     res.render('index', {
//   			title: 'Customers'
//   		});
//     //}
// });
//var customers;
connection.on('connect', function(err) {
    // If no error, then good to go...
    executeStatement();
  }
);

var customers = [];

function executeStatement() {

  request = new Request(sqlStatement, function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }
    connection.close();
  });

  request.on('row', function(columns) {
		/*
    columns.forEach(function(column) {

      if (column.value === null) {
        console.log('NULL');
      } else {
        customers.push(column.value);
        //console.log(column.value);
        //console.log('this is a test for customers: ' + customers);

				customers.forEach(function(val){
					console.log('this is a customer value: ' + val);
					//customer.push(val);
				});

				app.get('/', function(req, res) {
				    res.render('index', {
							title: 'Customers',
							customers: customers
						});
				});

      }
    });
		*/
		//columns.forEach(function(column) {
		for (var i = 0; i < columns.length; i+= 2){
			if (columns.value === null) {
				console.log('NULL');
			} else {
				var customer = columns[i].value + " " + columns[i+1].value;
//				customers.push(columns[i].value);
//				customers.push(columns[i+1].value);
				customers.push(customer);
				//console.log(column.value);
				//console.log('this is a test for customers: ' + customers);

				customers.forEach(function(val){
					console.log('this is a customer value: ' + val);
					//customer.push(val);
				});

				app.get('/', function(req, res) {
						res.render('index', {
							title: 'Customers',
							customers: customers
						});
				});

			}
		};
  });

  request.on('done', function(rowCount, more) {
      console.log(rowCount + ' rows returned');
    });

  connection.execSql(request);
};

app.get('/', function(req, res) {
    res.render('index', {
			title: 'Customers',
			customers: customers
		});
});


/*
app.get('/', function(req, res) {
      const errors = req.validationErrors();
      //var customers = [];
      if (errors) {
        console.log(errors);
      } else {
console.log('--------Code Check #1--------');
console.log('This is a test inside of GET: ' + customers);
        res.render('index', {
          title: 'Customers',
          customers: customers
        });
      }
});
*/



        //    var customer = connectToDB();
        //console.log('HERE::::: ' + customer);
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------

        connection.on('connect', function(err) {
            if (err) {
              console.log(err)
            } else{
              console.log('Reading rows from the Table...');

console.log('--------Code Check #1--------');

              // Query
              request = new Request("select c.FirstName FROM Customer AS C WHERE c.CustomerId = '9';",
                function(err, rowCount, rows) {
console.log('--------Code Check #2--------');
                  if (err) {
                  console.log(err);
                } else {
                  console.log(rowCount + ' row(s) returned');

                  rows.forEach(function(columns) {
                    var rowObject = {};
                    columns.forEach(function(column) {
                      rowObject[column.meta.data.colName] = column.value;
                    });
                    jsonArray.push(rowObject);
                  });
                  //  console.log(jsonArray);
                  jsonArray.forEach(function(items) {
                    customers.push(items);
                    console.log(items);
                  });
                  //return callback(null, rowCount, jsonArray);
                  //return customers;
                  //process.exit();
                }
              });
connection.execSql(request);

          }

          res.render('index', {
            title: 'Customers',
            customers: customers
          });
        });

    }
  });



----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------

var request = new Request("select c.FirstName FROM Customer AS C WHERE c.CustomerId = '9'", function (err, rowCount, rows) {

    if (err) {
        console.log(err);
    } else {
        console.log(rowCount + ' rows');
    }
    console.log(rows) // this is the full array of row objects
    // it just needs some manipulating

    jsonArray = []
    rows.forEach(function (columns) {
        var rowObject ={};
        columns.forEach(function(column) {
            rowObject[column.metadata.colName] = column.value;
        });
        jsonArray.push(rowObject)
    });

    jsonArray.forEach(function(items) {
      customers.push(items);
      console.log(items);
    });

    return callback(null, rowCount, jsonArray);

});

res.render('index', {
  title: 'Customers',
  customers: customers
});

}
});

----------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//     res.render('index', {
//       title: 'Customers'
//       customer: customers
//     });
//   }
// });



/*

// Attempt to connect and execute queries if connection goes through
function connectToDB(){
  connection.on('connect', function(err)
     {
       if (err)
         {
            console.log(err)
         }
      else
         {
           var customers = [];
           customers = queryDatabase();
             return customers;
         }
     }
   );
}


function queryDatabase()
   { console.log('Reading rows from the Table...');
   var customers = [];
       // Read all rows from table
     request = new Request(
          "select c.FirstName FROM Customer AS C WHERE c.CustomerId = '9';",
             function(err, rowCount, rows)
                {
                  if (err)
                  console.log(err);
                  else{
                    console.log(rowCount + ' row(s) returned');

                    rows.forEach(function(columns){
                      var rowObject= {};
                      columns.forEach(function(column){
                        rowObject[column.meta.data.colName] = column.value;
                      });
                      jsonArray.push(rowObject);
                    });
                  //  console.log(jsonArray);
                    jsonArray.forEach(function(items){
                      customers.push(items);
                      console.log(items);
                    })
                    //return callback(null, rowCount, jsonArray);
                    return customers;
                    process.exit();
                  }
                }
            );

     // request.on('row', function(columns) {
     //    columns.forEach(function(column) {
     //      console.log(column.value);
     //        customers.push(column.value);
     //     });
     //         });
     //
     // connection.execSql(request);
     // return customers;
   }



*/
 //Opens port
 app.listen(3000, function(){
 	console.log('Server Started on Port 3000');
 });
