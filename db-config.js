
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
    Host_Rating: 4,
    Contributor_Rating: 4,
    Phone_Number: '7729790088',
    City: 'New Orleans'
  });
})
.then(() => {
  User.findAll({}).then((usersData) => {
    console.log("Successful test post and query to db: ", usersData[0].dataValues);
  }).catch((err) => {
    console.log("error in querying database: ", err);
  })
});



