
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plays').del()
    .then(function () {
      // Inserts seed entries
        return Promise.all([
            knex('plays').insert([
                {play_id: 1, week_id: 1, player_id: 1, rank: 1},
                {play_id: 2, week_id: 1, player_id: 2, rank: 2},
                {play_id: 3, week_id: 1, player_id: 3, rank: 3},

                {play_id: 4, week_id: 2, player_id: 1, rank: 2},
                {play_id: 5, week_id: 2, player_id: 2, rank: 3},
                {play_id: 6, week_id: 2, player_id: 3, rank: 1},

                {play_id: 7, week_id: 3, player_id: 1, rank: 3},
                {play_id: 8, week_id: 3, player_id: 2, rank: 2},
                {play_id: 9, week_id: 3, player_id: 3, rank: 1}
            ]),
            knex.raw('ALTER SEQUENCE plays_play_id_seq RESTART WITH 10'),
        ]);
    });
};