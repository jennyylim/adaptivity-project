const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const user = require('./model/user');
const app = express();
const dbURI = require('./config/keys').MongoURI;

//register views engine
//views is the default folder it look for
// if other folder is used, put another app.set below, --> app.set('<mainfoldername>', '<foldername>');
const PORT = process.env.PORT || 4000;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}) //2nd parameter to stop deprecation warning
    .then((result)=>app.listen(PORT, console.log("started server")))
    .catch((err) => console.log(err));

// Passport Config
require('./config/passport')(passport);

// app.use(expressLayouts);
app.set('view engine', 'ejs');

//middleware & static file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // a middleware that allow drawing of input for data from form

var MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions'
});

//creating sessions in mongodb, destroyed at logout-- no longer linked to user
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: store,
        unset: 'destroy',
        name: 'session cookie'
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', require('./routes/security'));

app.use('/users', require('./controller/userController'));

//localhost:4000/testone

app.post('/testone',(req, res) =>{
    const {email, password} = req.body;
    req.user.isAnswer = req.body;
    req.user.save();
    console.log(req.body);
    console.log(req.user.isAnswer);
    res.redirect('/users/dashboard');
    //redirect - feel free to change
    console.log('successful');
})


