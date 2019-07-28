const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Play', () => {
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