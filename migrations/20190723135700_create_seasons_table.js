
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('seasons', t => {
            t.increments('season_id').primary();
            t.string('name');
        })
    ]);
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('seasons');
};
