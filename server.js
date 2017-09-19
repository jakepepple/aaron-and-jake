require('dotenv').config();
const path = require('path');
//express requirements
const express = require('express');
const expressVue = require('express-vue');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//webpack requirements
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig);
//database requirements
const db = require('./db-config');
const passwordHash = require('password-hash');
const User = db.User;
//passport requirements
const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;


const app = express();

//webpack middleware
app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))

//vue middleware
const vueOptions = {
  rootPath: path.join(__dirname, '/dist/'), 
};
const expressVueMiddleWare = expressVue.init(vueOptions);
app.use(expressVueMiddleWare);
app.use(express.static(path.join(__dirname, '/dist/')));

//cross domain access
var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);


//passport strategy set-up
passport.use(new JsonStrategy({
    usernameProp: 'email',
    passwordProp: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.findOne({ where: { email: username }}).then((user) => {
      console.log('authenticating' );    
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
      passport.serializeUser((user, done) => {
        
        return done(null, user.id);
      })
      passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
          if (user) {
            done(null, user.get());
          } else {
            done(user.errors, null);
          }
        })
      })
      return done(null, user);

    })
    .catch((err) => {
      console.log('error logging in:', err);
      return done(err)
    })
  }
))

//passport middleware
app.use(session({ secret: 'dinnertime'}));
app.use(bodyParser.json({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


//Routes:

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})



app.get('/browse', (req, res, next) => {
  //IN PROGRESS
  // console.log('connected');
  // const data = {
  //   otherData: 'something from the server'
  // };
  // res.send(data);
  // next();
});

app.post('/login', passport.authenticate('json', {failureRedirect: '/login'}), (req, res) => {
  //IN PROGRESS
  
  console.log('logging in success')
  console.log(res)
  res.status(201).send(`Successfully logged in as: ${req.body.email}`);
  // passport.authenticate('json', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/login',
  //   failureFlash: 'Incorrect email or password' 
  // })
});

app.get('/profile', (req, res, next) => {
  if (session.user) {
    res.status(200).send('Logged in: Profile access granted');
  } else {
    res.redirect('/login');
  }
});

app.post('/signup', (req, res, next) => {
  console.log(req);
  console.log(req.body);
  let hash = passwordHash.generate(req.body.password);
  //TEST password-hash
  
  User.findOrCreate({
    where: { Email: req.body.email }, defaults: {
      Name: req.body.name,
      Host_Rating: 0,
      Contributor_Rating: 0,
      City: req.body.city,
      Password: hash
    }
  })
    .spread((user, created) => {
      console.log(user.get({ plain: true }));
      console.log(created);
      if (created) {
        res.status(201).send('User successfully created');
      } else {
        res.status(200).send(user.get({plain: true}));
      }
    })
});

app.post('/create', (req, res, next) => {

});



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

//TEST SERVER
// app.listen(80, 'localhost', function() {
//   console.log('successfully hosting on 3001');
// })