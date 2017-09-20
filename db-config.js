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
    idle: 10000,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database successful');
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });

const User = sequelize.define('user', {
  Name: {
    type: Sequelize.STRING,
  },
  Host_Rating: {
    type: Sequelize.INTEGER,
  },
  Contributor_Rating: {
    type: Sequelize.INTEGER,
  },
  Email: {
    type: Sequelize.STRING,
  },
  City: {
    type: Sequelize.STRING,
  },
  Password: {
    type: Sequelize.STRING,
  },
});

const Event = sequelize.define('event', {
  Name: {
    type: Sequelize.STRING,
  },
  RecipeID: {
    type: Sequelize.STRING,
  },
  LocationLat: {
    type: Sequelize.INTEGER,
  },
  LocationLng: {
    type: Sequelize.INTEGER,
  },
  Time: {
    type: Sequelize.DATE,
  },
  Host: {
    type: Sequelize.STRING,
  },
});

// TEST DB-EVENT CREATION & QUERY
// Event.sync().then(() => {
//   Event.findOrCreate({
//     where: { Name: 'test event' },
//     defaults: {
//       RecipeID: '7bf4a371c6884d809682a72808da7dc2',
//       LocationLat: -25.363,
//       LocationLng: 131.044,
//       Time: Date.now(),
//       Host: 'Jake Pepple',
//     },
//   }).spread((user, created) => {
//     console.log(user.get({ plain: true }));
//     console.log(created);
//   });
// });

// TEST DB-USER CREATION & QUERY
// User.sync().then(() => {
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
module.exports.Event = Event;
