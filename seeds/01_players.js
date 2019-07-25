
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(() => {
            return knex('plays').del()
        })
        .then(() => {
            return knex('weeks').del()
        })
        .then(() => {
            return knex('seasons').del()
        })
        .then(() => {
            return knex('players').del()
        })
        .then(function () {
            // Inserts seed entries
            return Promise.all([
                knex('players').insert([
                    {player_id: 1, name: 'GregE', active: true},
                    {player_id: 2, name: 'JoeL', active: true},
                    {player_id: 3, name: 'IsaacL', active: true},
                    {player_id: 4, name: 'OtherGuy', active: false}
                ]),
                knex.raw('ALTER SEQUENCE players_player_id_seq RESTART WITH 5'),
            ]);
        });
};
