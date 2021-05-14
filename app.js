const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const user = require('./model/user');

const app = express();
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 4000;
var MongoDBStore = require('connect-mongodb-session')(session);
