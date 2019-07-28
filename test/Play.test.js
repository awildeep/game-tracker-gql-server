const expect = require('chai').expect;
const {signInAdmin, signInNonAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const database = require('./helpers/database');

describe('Play', () => {
    beforeEach(() => database.seed.run(config));

    it('Should prevent creating from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "playCreateRequest": {
                    week_id: 1,
                    player_id: 1,
                    rank: 20,
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should prevent editing from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "playEditRequest": {
                    play_id: 1,
                    player_id: 1,
                    rank: 20,
                }
            }, {token: tokenData.data.SignIn.token || ""});
        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should prevent deleting from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekDelete.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "weekDeleteRequest": {
                    week_id: 1,
                }
            }, {token: tokenData.data.SignIn.token || ""});
        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should be able to create a play', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "playCreateRequest": {
                    week_id: 1,
                    player_id: 4,
                    rank: 20,
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('PlayCreate');
        expect(data.data.PlayCreate).to.have.property('rank');
        expect(data.data.PlayCreate.rank).to.equal(20);
    });

    it('Should be able to edit a play', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "playEditRequest": {
                    play_id: 1,
                    player_id: 4,
                    rank: 25,
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('PlayEdit');
        expect(data.data.PlayEdit).to.have.property('rank');
        expect(data.data.PlayEdit.rank).to.equal(25);
    });

    it('Should be able to delete a play', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayCreate.graphql"), 'UTF-8');
        const newData = await queryServer(query,
            {
                "playCreateRequest": {
                    week_id: 1,
                    player_id: 4,
                    rank: 20,
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(newData.data).to.have.property('PlayCreate');
        expect(newData.data.PlayCreate).to.have.property('play_id');

        const deleteQuery = readFileSync(join(__dirname, "../src/resolvers/play/mutation/PlayDelete.graphql"), 'UTF-8');
        const data = await queryServer(deleteQuery,
            {
                "playDeleteRequest": {
                    play_id: newData.data.PlayCreate.play_id
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('PlayDelete');
        expect(data.data.PlayDelete).to.have.property('play_id');
        expect(data.data.PlayDelete.play_id).to.equal(newData.data.PlayCreate.play_id.toString());
    });

    it('Should fetch a specific play', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/play/query/Play.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "playRequest": {
                    play_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Play');
        expect(data.data.Play).to.have.property('week');
        expect(data.data.Play).to.have.property('player');
        expect(data.data.Play).to.have.property('rank');
        expect(data.data.Play.week).to.have.be.instanceof(Object);
        expect(data.data.Play.player).to.have.be.instanceof(Object);
    });
});