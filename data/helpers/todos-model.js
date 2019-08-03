const db = require('../dbConfig.js');

function add(userID, todo) {
    return get(userID)
        .insert(todo)
        .returning('id')
        .then(ids => {
            const [id] = ids;
            return getById(userID, id);
        });
}

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

function update(userID, id, changes) {
    return get(userID)
        .where({ id })
        .update(changes);
}

function getDeleted(userID) {
    return get(userID)
        .where('deleted', 1);
}

function getCompleted(userID) {
    return get(userID)
        .where('completed', 1);
}

module.exports = {
    add,
    remove,
    get,
    getById,
    update,
    getDeleted,
    getCompleted
};