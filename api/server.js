const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'CookieForJonathan',// by default it is SID change it for security
  secret: 'it is a string', // use environmet variable
  cookie: {
    httpOnly: true, // JS cannot access cookies
    maxAge: 1000 * 60 * 60, // expiration time in milliceconds
    secure: false,//process.env.NODE_ENV === production ? true : false, // use cookie HTTPs only should be true in production
  },
  resave: false,
  saveUninitialized: true // read about GDPR complience about cookies
}

// global middleware
server.use(sessions(sessionConfig)) // turn on sessions support

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
