const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

//routes
const userRoutes = require('./features/user/route');

// Connect to db
const db_uri = require('./config').DB_URL;
mongoose.connect(db_uri);
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.on('connected', () => console.log('Connected to mongodb'));

// logger
app.use(morgan('dev'));

// set up body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

// set up routes
app.use('/users', userRoutes);

// No matched routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err
  })
})


module.exports = app;