const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Season', () => {
    it('Should fetch a list of seasons', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/season/query/Seasons.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "seasonsRequest": {}
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('Seasons');
        expect(data.Seasons).to.have.be.instanceof(Array);
        expect(data.Seasons[0]).to.have.property('season_id');
        expect(data.Seasons[0]).to.have.property('name');
        expect(data.Seasons[0]).to.have.property('weeks');
        expect(data.Seasons[0].weeks).to.have.be.instanceof(Array);

    });

    it('Should fetch a specific season', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/season/query/Season.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "seasonRequest": {
                    season_id: 1
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('Season');
        expect(data.Season).to.have.property('season_id');
        expect(data.Season).to.have.property('name');
        expect(data.Season).to.have.property('weeks');
        expect(data.Season.weeks).to.have.be.instanceof(Array);
    });
});