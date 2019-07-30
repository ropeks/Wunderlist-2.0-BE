const db = require('../dbConfig.js');

function get(userID) {
    return db('todos').where('user_id', userID);
}

function getById(userID, id) {
    return get(userID)
        .where({ id })
        .first();
}

function remove(userID, id) {
    return get(userID)
        .where({ id })
        .del();
}

module.exports = {
    remove,
    get,
    getById
};