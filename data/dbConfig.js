const knex = require('knex');
const knexConfig = require('../knexfile.js');

let environment;

switch(process.env.NODE_ENV) {
    case 'production':
        environment = knex(knexConfig.production)
        break
    case 'test':
        environment = knex(knexConfig.testing)
        break
    default:
        environment = knex(knexConfig.development)
}

module.exports = environment;