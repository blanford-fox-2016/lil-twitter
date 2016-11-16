require('dotenv').config()
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/twit.api');
const auth = require('./routes/auth.api')
const mongoose = require('mongoose');
const session = require('express-session')

const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const app = express();
const ModelUser = require('./models/auth.model')

const Twit = require('./models/twit.model')

// MONGODB AND MONGOOSE
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

// -----------------------------------------------------------------------------
// ROUTE AND PASSPORT CONFIGURATION
// -----------------------------------------------------------------------------

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(ModelUser.authenticate()))


app.use('/api/twit', api);
app.use('/api/auth', auth);


// BIND PASSPORT WITH USER MODEL (PASSPORT-LOCAL-MONGOOSE)
passport.serializeUser(ModelUser.serializeUser())
passport.deserializeUser(ModelUser.deserializeUser())


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
