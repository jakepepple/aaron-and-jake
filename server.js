const express = require('express');
const expressVue = require('express-vue');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);
const path = require('path');
require('dotenv').config();


const app = express();

app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

const vueOptions = {
  rootPath: path.join(__dirname, './src'),
  
};

const expressVueMiddleWare = expressVue.init(vueOptions);
app.use(expressVueMiddleWare);

var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
}
app.use(allowCrossDomain);

app.get('/browse', (req, res, next) => {
  
  console.log('connected');
  const data = {
    otherData: 'something from the server'
  };
  res.send(data);
  next();
});

app.post('/login', (req, res, next) => {
  
});

app.get('/profile', (req, res, next) => {

});

app.post('/signup', (req, res, next) => {
  
});

app.post('/create', (req, res, next) => {

});



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
