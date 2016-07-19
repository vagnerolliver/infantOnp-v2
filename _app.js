'use strict';

require('./config/dbModels');


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');

// var routes = require('./routes/index');
// var users = require('./routes/users');
var authenticate = require('./routes/authenticate')(passport);
 

// Nossos módulos da API
const UsersAPI = require('./modules/User/routes');
const AlunosAPI = require('./modules/Aluno/routes');
const TurmasAPI = require('./modules/Turma/routes');
const FuncionariosAPI = require('./modules/Funcionario/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/_dist', 'favicon.ico')));

// app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public/_dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
      secret: process.env.SESSION_SECRET || 'secret'
    , resave:false
    , saveUninitialized:false 
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', routes);
// app.use('/users', users);

passport.use( new passportLocal.Strategy( { usernameField: 'email', passwordField: 'password' }, verifyCredentials ));

passport.use( new passportHttp.BasicStrategy( { usernameField: 'email', passwordField: 'password' }, verifyCredentials ));

function verifyCredentials( email, password, done ){ 
  // Preten this is usign a a real database 
    User.findOne({'email': email}, function(err, user){
       if(err)
        return done(err);

       if(user){
         return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
         // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
       } else {
         var user = req.user;
         user.email = email;
         // user.password = user.generateHash(password);
         user.password = password;
         user.save(function(err){
           if(err)
            return done(err);

            return done(null, user);
         });
       }
     });
}

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    // query database or cache here!
    User.findById(id, function(err, user){
      done(err, user);
    });
});


function ensureAuthenticated(req, res, next){
  if( req.isAuthenticated() ){
    next();
  } else {
    res.send(403)
  }
}

app.get('/', function(req, res){
  res.render('index', {
     isAuthenticated: req.isAuthenticated()
    ,user:req.user
  });
});

app.get('/login',function(req, res){
  res.render('login', {
     isAuthenticated: req.isAuthenticated()
    ,user:req.user
  });
});

app.post('/login',passport.authenticate('local'), function( req, res){
   res.redirect('/');
});

app.get('/logout',function(req, res){
  req.logout();
  res.redirect('/');
});


app.use('/api', passport.authenticate('basic'));

app.get('/api/data', ensureAuthenticated, function(req, res){
   res.json([
    { value: 'foo'},
    { value: 'bar'},
    { value: 'baz'},
   ])
});


// API JSON
app.use('/api/users', UsersAPI);
app.use('/api/alunos', AlunosAPI);
app.use('/api/turmas', TurmasAPI);
app.use('/api/funcionarios', FuncionariosAPI);
 

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
