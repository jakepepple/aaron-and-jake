const passwordHash = require('password-hash');
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
  Email: {
    type: Sequelize.STRING
  },
  City: {
    type: Sequelize.STRING
  },
  Password: {
    type: Sequelize.STRING
  }
});


// TEST DB-USER CREATION & QUERY
// User.sync({force: true}).then(() => {
//   let hash = passwordHash.generate('test');
//   //TEST password-hash
//   User.findOrCreate({
//     where: { Email: 'jake@test.com' }, defaults: {
//       Name: 'Jake Test',
//       Host_Rating: 0,
//       Contributor_Rating: 0,
//       Email: 'jake@jake.com',
//       City: 'New Orleans',
//       Password: hash
//     }
//   })
//     .spread((user, created) => {
//       console.log(user.get({ plain: true }));
//       console.log(created);
//     })
// });




module.exports.User = User;
