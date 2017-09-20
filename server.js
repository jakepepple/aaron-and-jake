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

const User = db.User;
const Event = db.Event;
const Message = db.Message;
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
  next();
};
app.use(allowCrossDomain);


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
    console.log('about to serialize');
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
    });
    return done(null, user);
  })
    .catch((err) => {
      console.log('error logging in:', err);
      return done(err);
    });
}));

// passport middleware
app.use(session({ secret: 'dinnertime' }));
app.use(bodyParser.json({ extended: false }));
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
    res.status(200).send(events);
  });
});

app.post('/login', passport.authenticate('json', { failureRedirect: '/login' }), (req, res) => {
  // IN PROGRESS

  console.log('logging in success');
  res.status(201).send(`Successfully logged in as: ${req.body.email}`);
  // passport.authenticate('json', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/login',
  //   failureFlash: 'Incorrect email or password'
  // })
});

app.get('/profile', (req, res) => {
  if (session.user) {
    res.status(200).send('Logged in: Profile access granted');
  } else {
    res.redirect('/login');
  }
});

app.post('/signup', (req, res) => {
  console.log(req);
  console.log(req.body);
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

app.post('/create', (req, res) => {
  const location = req.body.location;
  const name = req.body.name;
  const meal = req.body.meal;
  const time = req.body.time;
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
      latitude = response.json.results.geometry.location.lat();
      longitude = response.json.results.geometry.location.lng();
    }
  })
    .then(() => {
      Event.findOrCreate({
        where: { Name: name },
        defaults: {
          RecipeID: meal,
          LocationLat: latitude,
          LocationLng: longitude,
          // Come back to format this Date
          Time: Date.now(),
          Host: session.user || 'Jake',
        },
      })
        .spread((event, created) => {
          if (created) {
            res.status(201).send('Event successfully created');
          } else {
            res.status(200).send('Event already exists! Pick another name.');
          }
        });
    });
});


const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// Set up socket
const io = socket(server);

io.on('connection', (currentSocket) => {
  console.log('made socket connection', currentSocket.id);
  let isInitialConnection = false;

  if (!isInitialConnection) {
    Message.findAll().then((messages) => {
      messages.forEach((message) => {
        io.currentSocket.emit('chat', message);
      });
      isInitialConnection = true;
    });
  }

  socket.on('chat', (data) => {
    Message.create({ Handle: data.handle, Message: data.message, Event: data.event })
      .then(() => {
        io.sockets.emit('chat', data);
      }).catch((err) => {
        console.log(err);
      });
  });
});

// TEST SERVER
// app.listen(80, 'localhost', function() {
//   console.log('successfully hosting on 3001');
// })

module.exports.server = server;
