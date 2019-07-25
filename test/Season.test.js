const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Season', () => {
    it('Should fetch a list of seasons', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/season/query/SeasonsGet.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "seasonsGetRequest": {}
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('SeasonsGet');
        expect(data.SeasonsGet).to.have.be.instanceof(Array);
        expect(data.SeasonsGet[0]).to.have.property('season_id');
        expect(data.SeasonsGet[0]).to.have.property('name');
        expect(data.SeasonsGet[0]).to.have.property('weeks');

    });
});