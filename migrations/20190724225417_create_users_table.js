
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('users', t => {
            t.increments('user_id').primary();
            t.string('username');
            t.string('name');
            t.string('password');
            t.boolean('admin');
            t.boolean('can_login');
        })
    ]);
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
