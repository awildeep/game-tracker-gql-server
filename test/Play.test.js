const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Play', () => {
    it('Should fetch a specific play', async () => {
        const tokenData = await signInAdmin();
        const playsQuery = readFileSync(join(__dirname, "../src/resolvers/play/query/Play.graphql"), 'UTF-8');
        const data = await queryServer(playsQuery,
            {
                "playRequest": {
                    play_id: 1
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('Play');
        expect(data.Play).to.have.property('week');
        expect(data.Play).to.have.property('player');
        expect(data.Play).to.have.property('rank');
        expect(data.Play.week).to.have.be.instanceof(Object);
        expect(data.Play.player).to.have.be.instanceof(Object);
    });
});