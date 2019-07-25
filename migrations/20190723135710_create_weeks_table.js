
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('weeks', t => {
            t.increments('week_id').primary();
            t.integer('season_id').unsigned();
            t.foreign('season_id').references('seasons.season_id');
            t.date('date_played');
        })
    ])
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('weeks');
};
