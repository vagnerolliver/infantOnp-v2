'use strict';

require('./config/dbModels');
require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan       = require('morgan');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
var passportHttp = require('passport-http');

// Nossos módulos da API
const UsersAPI = require('./modules/User/routes');
const UsersAPI_ = require('./modules/_User/routes');
const AlunosAPI = require('./modules/Aluno/routes');
const TurmasAPI = require('./modules/Turma/routes');
const FuncionariosAPI = require('./modules/Funcionario/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/_dist', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public/_dist')));

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth) - TODO: mudar isso para JWT depois.
app.use(bodyParser());

// required for passport
app.use(session({secret: 'MisterOfTretas'})); //session secret.
app.use(passport.initialize());
app.use(passport.session()); //persistent login session
app.use(flash()); // use connect-flash for flash messages stored in session.

// passport.use( new passportHttp.BasicStrategy( verifyCredentials ));

// function verifyCredentials( username, password, done ){ 
//   // Preten this is usign a a real database 
//   if( username == password ){
//     console.log(username)
//     done(null, { id: username , name: username });
//   } else {
//     done(null,null);
//   }
// }
// app.use('/api', passport.authenticate('basic'));


// API JSON
app.use('/users', UsersAPI)
// require('./app/routes.js')(app, passport); 
//Register the authentication middleware
// app.use('/nothing', isLoggedIn);

app.use('/api/users', UsersAPI_);
app.use('/api/alunos', AlunosAPI);
app.use('/api/turmas', TurmasAPI);
app.use('/api/funcionarios', FuncionariosAPI);

//route middleware to make sure a user is logged in
function isLoggedIn(req, res,next){

  //if user is authenticated in the session carry on
  if(req.isAuthenticated())
  {
      return next();
  }

  //if they aren't edirect them to the home page.
  res.redirect('/');
}

 

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
