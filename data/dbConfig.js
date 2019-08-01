const knex = require('knex');
const knexConfig = require('../knexfile.js');

let environment;

switch(process.env.NODE_ENV) {
    case 'development':
        environment = knex(knexConfig.development)
        break
    case 'test':
        environment = knex(knexConfig.testing)
        break
    default:
        environment = knex(knexConfig.production)
}

module.exports = environment;