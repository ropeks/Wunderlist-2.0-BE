const bcrypt = require('bcrypt');
const hashIt = bcrypt.hashSync;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'ropeks', password: hashIt('1234', 10)},
        {id: 2, username: 'alex', password: hashIt('hardpass', 10)},
        {id: 3, username: 'matt', password: hashIt('hello', 10)}
      ]);
    });
};
