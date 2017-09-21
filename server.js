require('dotenv').config();
const path = require('path');
// express requirements
const express = require('express');
const expressVue = require('express-vue');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// webpack requirements
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig);
// database requirements
const passwordHash = require('password-hash');
const db = require('./db-config');

const { User, Event, Message } = db;
// passport requirements
const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
// google maps requirement
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
});
// socket requirement
const socket = require('socket.io');

const app = express();

// webpack middleware
app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

// vue middleware
const vueOptions = {
  rootPath: path.join(__dirname, '/dist/'),
};
const expressVueMiddleWare = expressVue.init(vueOptions);
app.use(expressVueMiddleWare);
app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(__dirname));

// cross domain access
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};
app.use(allowCrossDomain);

// passport session setup
passport.serializeUser((user, done) => {
  console.log('serializing', user.dataValues.id || 'no user to serialize');
  done(null, user.dataValues.id);
});
passport.deserializeUser((id, done) => {
  console.log('deserializing', id || 'no id to deserialize');
  User.findById(id, err).then((err, user) => {
    done(err, user);
  });
});

// passport strategy set-up
passport.use(new JsonStrategy({
  usernameProp: 'email',
  passwordProp: 'password',
  passReqToCallback: true,
}, (req, username, password, done) => {
  User.findOne({ where: { email: username } }).then((user) => {
    console.log('authenticating');
    if (!user) {
      console.log('no user');
      return done(null, false, { message: 'No user with that email in directory.' });
    }
    if (!passwordHash.verify(password, user.dataValues.Password)) {
      console.log(password, user);
      console.log('wrong password');
      return done(null, false, { message: 'Incorrect password!' });
    }

    console.log('passed authentication');
    return done(null, user);
  })
    .catch((err) => {
      console.log('error logging in:', err);
      return done(err);
    });
}));

<<<<<<< HEAD
// parsers, passport session init
app.use(cookieParser('dinnertime'));
app.use(bodyParser.json({ extended: false }));
app.use(session({ secret: 'dinnertime', cookie: { maxAge: 240000 } }));
=======
// passport middleware, parsers
app.use(session({ secret: 'dinnertime' }));
app.use(bodyParser.json({ extended: false }));
app.use(cookieParser('hungry people'));
>>>>>>> Build out routes, refactor using es6
app.use(passport.initialize());
app.use(passport.session());

// Routes:

app.get('/', (req, res) => {
  console.log('sent with app.get');
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/browse', (req, res) => {
  // IN PROGRESS
  Event.findAll().then((events) => {
    console.log(events);
    res.status(200).send(events);
  });
});

app.post('/login', passport.authenticate('json', { failureRedirect: '/login' }), (req, res) => {
  // IN PROGRESS
<<<<<<< HEAD
  // console.log('cookies', req.cookies);
  console.log('session at login', req.session);
  // console.log('login:', req.user || 'no user');
  console.log('logging in success');
  req.login(req.user, (err) => {
    if (err) {
      console.log('error logging in:', err);
    }
  });
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  console.log(req.session.passport);
  console.log('session at profile', req.session);
  console.log(req.user || 'no user');
  console.log(req.cookies || 'no cookies');
  if (!req.user) {
    res.status(401).send('Not logged in!');
  } else if (req.user) {
    User.findById(req.user.id).then((user) => {
      console.log(user);
=======
  console.log('cookies', req.cookies);
  console.log('session', req.session);
  console.log('logging in success');
  res.status(201).send(`Successfully logged in as: ${req.body.email}`);
});

app.get('/profile', (req, res) => {
  if (!req.session.passport) {
    res.status(401).send('Not logged in!');
  } else if (req.session.passport.user) {
    User.findById(req.session.passport.user).then((user) => {
>>>>>>> Build out routes, refactor using es6
      res.status(200).send(user);
    });
  }
});

app.post('/signup', (req, res) => {
  const hash = passwordHash.generate(req.body.password);
  // TEST password-hash

  User.findOrCreate({
    where: { Email: req.body.email },
    defaults: {
      Name: req.body.name,
      Host_Rating: 0,
      Contributor_Rating: 0,
      City: req.body.city,
      Password: hash,
    },
  })
    .spread((user, created) => {
      console.log(user.get({ plain: true }));
      console.log(created);
      if (created) {
        res.status(201).send('User successfully created');
      } else {
        res.status(200).send(user.get({ plain: true }));
      }
    });
});

<<<<<<< HEAD
app.post('/create', (req, res) => {
  const {
    location, name, meal,
  } = req.body;
=======
app.post('/create', ({ body }, res) => {
  const {
    location, name, meal, time,
  } = body;
>>>>>>> Build out routes, refactor using es6
  // Calculate Latitude and Longitude from this address
  let latitude;
  let longitude;
  googleMapsClient.geocode({
    address: location,
  }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.json.results);
      console.log(response.json.results[0].geometry);
      latitude = response.json.results[0].geometry.location.lat;
      longitude = response.json.results[0].geometry.location.lng;
      console.log(name, meal, latitude, longitude);
      Event.create({
        Name: name,
        RecipeID: meal,
        LocationLat: latitude,
        LocationLng: longitude,
        // Come back to format this Date
        Time: Date.now(),
        Host: session.user || 'Aaron',
      }).then(() => {
        console.log('event happened');
        res.status(201).send('Event successfully created');
      }, (error) => {
        console.log('error creating event:', error);
        res.status(500).send('Error creating event');
      });
    }
  });
});


const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// Set up socket
const io = socket(server);

<<<<<<< HEAD
io.on('connection', (currentSocket) => {
  console.log('made currentSocket connection', currentSocket.id);
  // let isInitialConnection = false;
=======
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);


  socket.on('chat', (data) => {
    // IN PROGRESS - Fetch past messages from db
    // let isInitialConnection = false;
>>>>>>> Build out routes, refactor using es6

  // if (!isInitialConnection) {
  //   Message.findAll().then((messages) => {
  //     messages.forEach((message) => {
  //       io.currentSocket.emit('chat', message);
  //     });
  //     isInitialConnection = true;
  //   });
  // }

  currentSocket.on('chat', (data) => {
    Message.create({ Handle: data.handle, Message: data.message, Event: data.event })
      .then(() => {
        io.sockets.emit('chat', data);
      }).catch((err) => {
        console.log(err);
      });
  });
  currentSocket.on('typing', (data) => {
    currentSocket.broadcast.emit('typing', data);
  });
});

// TEST SERVER
// app.listen(80, 'localhost', function() {
//   console.log('successfully hosting on 3001');
// })

module.exports.server = server;
