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
  rootPath: path.join(__dirname, './src'), 
};
const expressVueMiddleWare = expressVue.init(vueOptions);
app.use(expressVueMiddleWare);

//cross domain access
var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);


//passport strategy set-up
passport.use('json', new JsonStrategy({
    usernameField: 'email',
  }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      console.log('authenticating' );
      if (err) {
        console.log(err)
        return done(err);
      }
      if (!user) {
        console.log('no user');
        return done(null, false, { message: 'No user with that email in directory.' });
      }
      if (!passwordHash.verify(password, user.password)) {
        console.log('wrong password');
        return done(null, false, { message: 'Incorrect password!' });
      }
       console.log('Success login!')
      return done(null, user);
    })
  }
))

//passport middleware
app.use(session({ secret: 'dinnertime'}));
app.use(bodyParser.json({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


//Routes:




app.get('/browse', (req, res, next) => {
  //IN PROGRESS
  // console.log('connected');
  // const data = {
  //   otherData: 'something from the server'
  // };
  // res.send(data);
  // next();
});

app.post('/login', (req, res, next) => {
  //IN PROGRESS
  
  passport.authenticate('json', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Incorrect email or password' 
  })
});

app.get('/profile', (req, res, next) => {

});

app.post('/signup', (req, res, next) => {
  console.log(req);
  console.log(req.body);
  let hash = passwordHash.generate(req.body.password);
  //TEST password-hash
  let User = db.User;
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



// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });

//TEST SERVER
app.listen(80, 'localhost', function() {
  console.log('successfully hosting on 3001');
})