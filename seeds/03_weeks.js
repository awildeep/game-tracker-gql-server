
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weeks').del()
    .then(function () {
      // Inserts seed entries
        return Promise.all([
            knex('weeks').insert([
                {week_id: 1, season_id: 1, date_played: new Date('01-01-2016')},
                {week_id: 2, season_id: 1, date_played: new Date('01-08-2016')},
                {week_id: 3, season_id: 1, date_played: new Date('01-14-2016')}
            ]),
            knex.raw('ALTER SEQUENCE weeks_week_id_seq RESTART WITH 4'),
        ]);
    });
};
