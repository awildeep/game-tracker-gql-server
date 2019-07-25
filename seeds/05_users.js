const bcrypt = require('bcrypt');

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(async function () {
            // Inserts seed entries
            return Promise.all([
                knex('users').insert([
                    {
                        user_id: 1,
                        username: 'awildeep@gmail.com',
                        name: 'GregE',
                        password: await bcrypt.hash('testing', 10),
                        admin: true,
                        can_login: true
                    },
                    {
                        user_id: 2,
                        username: 'junk@thinkof.net',
                        name: 'GregE',
                        password: await bcrypt.hash('testing', 10),
                        admin: false,
                        can_login: false
                    },
                    {
                        user_id: 3,
                        username: 'greg@thinkof.net',
                        name: 'GregE',
                        password: await bcrypt.hash('testing', 10),
                        admin: false,
                        can_login: true
                    },
                ]),
                knex.raw('ALTER SEQUENCE users_user_id_seq RESTART WITH 3'),
            ]);
        });
};
