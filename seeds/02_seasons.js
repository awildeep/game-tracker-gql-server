
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('seasons').del()
    .then(function () {
      // Inserts seed entries
        return Promise.all([
            knex('seasons').insert([
                {season_id: 1, name: 'Season 1'},
            ]),
            knex.raw('ALTER SEQUENCE seasons_season_id_seq RESTART WITH 2'),
        ]);
    });
};
