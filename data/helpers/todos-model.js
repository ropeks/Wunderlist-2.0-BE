const db = require('../dbConfig.js');

function get(id) {
    return db('todos').where('user_id', id);
}

module.exports = {
    get
};