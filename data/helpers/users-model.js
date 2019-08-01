const db = require('../dbConfig.js');

function add(user) {
    console.log(user);
    return db('users')
        .insert(user)
        .returning('id')
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}

function get() {
    return db('users');
}

function getById(id) {
    return db('users')
      .where({ id })
      .first();
}

function getBy(filter) {
    return db('users')
      .where(filter)
      .first();
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes);
}

module.exports = {
    add,
    remove,
    get,
    getById,
    getBy,
    update
};