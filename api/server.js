const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

const authRouter = require('../router/authentication');
const usersRouter = require('../router/users');
const todosRouter = require('../router/todos');
const authenticator = require('../auth/authenticator');
const idChecker = require('../auth/idChecker');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticator, usersRouter);
server.use('/api/todos', authenticator, idChecker, todosRouter);

server.get('/', (req, res) => {
    res.json({ message: 'This is Wunderlist API. There are many wonders to come!' })
});

module.exports = server;