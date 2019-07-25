
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('players', t => {
            t.increments('player_id').primary();
            t.string('name');
            t.boolean('active');
        })
    ]);
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('players');
};
