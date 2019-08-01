exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 255)
            .notNullable()
            .unique();
        tbl.string('password', 255)
            .notNullable();
    })
    .createTable('todos', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .references('users.id')
        tbl.string('caption', 50)
            .notNullable();
        tbl.string('description', 500)
            .notNullable();
        tbl.date('due_date');
        tbl.boolean('completed');
        tbl.boolean('deleted');
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('todos')
        .dropTableIfExists('users');
};