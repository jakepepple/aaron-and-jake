const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
require('dotenv').config();


const app = express();

const vueOptions = {
  rootPath: path.join(__dirname, './src'),
  
};

const expressVueMiddleWare = expressVue.init(vueOptions);
app.use(expressVueMiddleWare);

app.get('/', (req, res, next) => {
  res.render('App');
});



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
