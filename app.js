const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const user = require('./model/user');
const app = express();
const dbURI = require('./config/keys').MongoURI;
//register view engine
//views is the default folder it look for
// if other folder is used, put another app.set below, --> app.set('<mainfoldername>', '<foldername>');
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) //2nd parameter to stop deprecation warning
    .then((result)=>app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

//middleware & static file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // a middleware that allow drawing of input for data from form


const PORT = process.env.PORT || 4000;
var MongoDBStore = require('connect-mongodb-session')(session);
