
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dinner', 'buckeyedseminole', 'Opspark17', {
  host: 'whoscomingtodinner.database.windows.net',
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database successful');
  })
  .catch(err => {
    console.log('Error connecting to database');
  });

const User = sequelize.define('user', {
  Name: {
    type: Sequelize.STRING
  },
  Host_Rating: {
    type: Sequelize.INTEGER
  },
  Contributor_Rating: {
    type: Sequelize.INTEGER
  },
  Phone_Number: {
    type: Sequelize.STRING
  },
  City: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(() => {
  return User.create({
    Name: 'Jake Pepple',
    Host_Rating: 3,
    Contributor_Rating: 4,
    Phone_Number: '7729790088',
    City: 'New Orleans'
  });
});
// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;

// const config = {
//   userName: 'buckeyedseminole',
//   password: 'Opspark17',
//   server: 'whoscomingtodinner.database.windows.net',
//   options: {
//     database: 'dinner',
//     encrypt: true,
//   },
// };
// const connection = new Connection(config);

// const queryDatabase = () => {
//   console.log('Reading rows from the Table...');

//   // Read all rows from table
//   request = new Request(
//     "SELECT * FROM Users",
//     function (err, rowCount, rows) {
//       console.log(rowCount + ' row(s) returned');
//       process.exit();
//     }
//   );

//   request.on('row', function (columns) {
//     columns.forEach(function (column) {
//       console.log("%s\t%s", column.metadata.colName, column.value);
//     });
//   });
//   connection.execSql(request);
// }

// connection.on('connect', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     queryDatabase();
//   }
// });
