const Sequelize = require('sequelize');
const passwordHash = require('password-hash');

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
  Notifications: {
    type: Sequelize.STRING,
  },
  Birthday: {
    // format: YYYY-MM-DD
    type: Sequelize.STRING,
  },
  Image: {
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
    type: Sequelize.DECIMAL(18, 7),
  },
  LocationLng: {
    type: Sequelize.DECIMAL(18, 7),
  },
  Address: {
    type: Sequelize.STRING,
  },
  Date: {
    // format: YYYY-MM-DD
    type: Sequelize.STRING,
  },
  Time: {
    // Military time
    type: Sequelize.STRING,
  },
  Host: {
    type: Sequelize.STRING,
  },
  Contributor_List: {
    type: Sequelize.STRING,
  },
  City: {
    type: Sequelize.STRING,
  },
  Zip_Code: {
    type: Sequelize.INTEGER,
  },
});

const Message = sequelize.define('message', {
  Handle: {
    type: Sequelize.STRING,
  },
  Message: {
    type: Sequelize.STRING,
  },
  Event: {
    type: Sequelize.STRING,
  },
});

// TEST DB-MESSAGE CREATION & QUERY
// Message.sync().then(() => {
//   Message.findOrCreate({
//     where: { Handle: 'randomUser' },
//     defaults: {
//       Message: 'I am a test message',
//       Event: 'jam sesh',
//     },
//   }).spread((message, created) => {
//     console.log(message.get({ plain: true }));
//     console.log(created);
//   });
// });

// TEST DB-EVENT CREATION & QUERY
// Event.sync({ force: true }).then(() => {
//   Event.findOrCreate({
//     where: { Name: 'test event 1' },
//     // defaults: {
//     //   RecipeID: 'http://www.edamam.com/ontologies/edamam.owl%23recipe_23086a94b64c2ba96e12b0dde8b23eb4',
//     //   Address: '748 Camp St',
//     //   LocationLat: 29.945947,
//     //   LocationLng: -90.0700232,
//     //   Time: Date.now(),
//     //   Host: 'jp',
//     // },
//     defaults: {
//       RecipeID: 'recipe_23086a94b64c2ba96e12b0dde8b23eb4',
//       Address: '729 Louque Pl',
//       City: 'New Orleans',
//       Zip_Code: 70124,
//       Contributor_List: '',
//       LocationLat:
//     29.9891516,
//       LocationLng: -90.1087028,
//       Date: '2017-11-5',
//       Time: '14:00',
//       Host: 'jp',
//     },
//   }).spread((event, created) => {
//     console.log(event.get({ plain: true }));
//     console.log(created);
//   });
// });

// // TEST DB-USER CREATION & QUERY
// User.sync({ force: true }).then(() => {
//   const hash = passwordHash.generate('test');
//   // TEST password-hash
//   User.findOrCreate({
//     where: { Email: 'jake@test.com' }, 
//     defaults: {
//       Name: 'Jake Test',
//       Host_Rating: 0,
//       Contributor_Rating: 0,
//       Notifications: '',
//       Email: 'jake@jake.com',
//       City: 'New Orleans',
//       Password: hash,
//       Birthday: '1993-07-21',
//       Image: '',
//     },
//   })
//     .spread((user, created) => {
//       console.log(user.get({ plain: true }));
//       console.log(created);
//     });
// });


module.exports.User = User;
module.exports.Event = Event;
module.exports.Message = Message;
