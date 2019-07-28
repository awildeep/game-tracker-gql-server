const expect = require('chai').expect;
const {signInAdmin, signInNonAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const database = require('./helpers/database');


describe('Season', () => {
    beforeEach(() => database.seed.run(config));

    it('Should prevent creating from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonCreateRequest": {
                    name: "test season"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should prevent delete from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonDelete.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonDeleteRequest": {
                    season_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should prevent editing from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonEditRequest": {
                    season_id: 1,
                    name: 'will not work'
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should be able to create a season', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonCreateRequest": {
                    name: "test season"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('SeasonCreate');
        expect(data.data.SeasonCreate).to.have.property('name');
        expect(data.data.SeasonCreate.name).to.equal("test season");
    });

    it('Should be able to edit a season', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonEditRequest": {
                    season_id: 1,
                    name: "Edited season"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('SeasonEdit');
        expect(data.data.SeasonEdit).to.have.property('name');
        expect(data.data.SeasonEdit.name).to.equal("Edited season");
    });

    it('Should be able to delete a season', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonCreate.graphql"), 'UTF-8');
        const newSeasonData = await queryServer(query,
            {
                "seasonCreateRequest": {
                    name: "test season"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(newSeasonData.data).to.have.property('SeasonCreate');
        expect(newSeasonData.data.SeasonCreate).to.have.property('name');
        expect(newSeasonData.data.SeasonCreate.name).to.equal("test season");

        const deleteQuery = readFileSync(join(__dirname, "../src/resolvers/season/mutation/SeasonDelete.graphql"), 'UTF-8');
        const data = await queryServer(deleteQuery,
            {
                "seasonDeleteRequest": {
                    season_id: newSeasonData.data.SeasonCreate.season_id
                }
            }, {token: tokenData.data.SignIn.token || ""});
        expect(data.data).to.have.property('SeasonDelete');
        expect(data.data.SeasonDelete).to.have.property('name');
        expect(data.data.SeasonDelete.season_id).to.equal(newSeasonData.data.SeasonCreate.season_id.toString());
    });

    it('Should fetch a list of seasons', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/query/Seasons.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonsRequest": {}
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Seasons');
        expect(data.data.Seasons).to.have.be.instanceof(Array);
        expect(data.data.Seasons[0]).to.have.property('season_id');
        expect(data.data.Seasons[0]).to.have.property('name');
        expect(data.data.Seasons[0]).to.have.property('weeks');
        expect(data.data.Seasons[0].weeks).to.have.be.instanceof(Array);

    });

    it('Should fetch a specific season', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/season/query/Season.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "seasonRequest": {
                    season_id: 1
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Season');
        expect(data.data.Season).to.have.property('season_id');
        expect(data.data.Season).to.have.property('name');
        expect(data.data.Season).to.have.property('weeks');
        expect(data.data.Season.weeks).to.have.be.instanceof(Array);
    });
});