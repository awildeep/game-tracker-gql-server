
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('plays', t => {
            t.increments('play_id').primary();
            t.integer('player_id').unsigned();
            t.foreign('player_id').references('players.player_id');
            t.integer('week_id').unsigned();
            t.foreign('week_id').references('weeks.week_id');
            t.integer('rank');
        })
    ]);
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plays');
};
