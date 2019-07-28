const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const database = require('./helpers/database');


describe('Season', () => {
    beforeEach(() => database.seed.run(config));

    it('Should be able to create a season', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonCreate.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "seasonCreateRequest": {
                    name: "test season"
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('SeasonCreate');
        expect(data.SeasonCreate).to.have.property('name');
        expect(data.SeasonCreate.name).to.equal("test season");
    });

    it('Should be able to edit a season', async () => {
        const tokenData = await signInAdmin();
        const seasonsQuery = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonEdit.graphql"), 'UTF-8');
        const data = await queryServer(seasonsQuery,
            {
                "seasonEditRequest": {
                    season_id: 1,
                    name: "Edited season"
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('SeasonEdit');
        expect(data.SeasonEdit).to.have.property('name');
        expect(data.SeasonEdit.name).to.equal("Edited season");
    });

    it('Should be able to delete a season', async () => {
        const tokenData = await signInAdmin();
        const seasonCreateQuery = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonCreate.graphql"), 'UTF-8');
        const newSeasonData = await queryServer(seasonCreateQuery,
            {
                "seasonCreateRequest": {
                    name: "test season"
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(newSeasonData).to.have.property('SeasonCreate');
        expect(newSeasonData.SeasonCreate).to.have.property('name');
        expect(newSeasonData.SeasonCreate.name).to.equal("test season");

        const seasonDeleteQuery = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonDelete.graphql"), 'UTF-8');
        const data = await queryServer(seasonDeleteQuery,
            {
                "seasonDeleteRequest": {
                    season_id: newSeasonData.SeasonCreate.season_id
                }
            }, {token: tokenData.SignIn.token || ""});

        expect(data).to.have.property('SeasonDelete');
        expect(data.SeasonDelete).to.have.property('name');
        expect(data.SeasonDelete.season_id).to.equal(newSeasonData.SeasonCreate.season_id);
    });

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