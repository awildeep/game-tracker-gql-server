const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Week', () => {
    it('Should fetch a specific week', async () => {
        const tokenData = await signInAdmin();
        const weeksQuery = readFileSync(join(__dirname, "../src/resolvers/week/query/Week.graphql"), 'UTF-8');
        const data = await queryServer(weeksQuery,
            {
                "weekRequest": {
                    week_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Week');
        expect(data.data.Week).to.have.property('week_id');
        expect(data.data.Week).to.have.property('date_played');
        expect(data.data.Week).to.have.property('plays');

    });

    it('Should fetch a list of weeks for a specific season', async () => {
        const tokenData = await signInAdmin();
        const weeksQuery = readFileSync(join(__dirname, "../src/resolvers/week/query/WeeksBySeason.graphql"), 'UTF-8');
        const data = await queryServer(weeksQuery,
            {
                "weeksBySeasonRequest": {
                    season_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('WeeksBySeason');
        expect(data.data.WeeksBySeason).to.have.be.instanceof(Array);
        expect(data.data.WeeksBySeason[0]).to.have.property('week_id');
        expect(data.data.WeeksBySeason[0]).to.have.property('date_played');
        expect(data.data.WeeksBySeason[0]).to.have.property('plays');
        expect(data.data.WeeksBySeason[0].plays).to.have.be.instanceof(Array);
    });
});