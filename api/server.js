const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.json({ message: 'This is Wunderlist API. There are many wonders to come!' })
});

module.exports = server;