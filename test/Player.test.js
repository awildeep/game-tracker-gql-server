const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Player', () => {
    it('Should fetch a list of players', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/player/query/Players.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "playersRequest": {}
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Players');
        expect(data.data.Players).to.have.be.instanceof(Array);
        expect(data.data.Players[0]).to.have.property('player_id');
        expect(data.data.Players[0]).to.have.property('name');
        expect(data.data.Players[0]).to.have.property('active');

    });

    it('Should fetch a specific player', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/player/query/Player.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "playerRequest": {
                    player_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Player');
        expect(data.data.Player).to.have.property('player_id');
        expect(data.data.Player).to.have.property('name');
        expect(data.data.Player).to.have.property('active');
    });
});