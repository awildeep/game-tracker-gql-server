const expect = require('chai').expect;
const {signInAdmin, signInNonAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const database = require('./helpers/database');

describe('Week', () => {
    beforeEach(() => database.seed.run(config));

    it('Should prevent creating from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "weekCreateRequest": {
                    season_id: 1,
                    date_played: "2000-01-01"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should prevent editing from a non-admin user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "weekEditRequest": {
                    week_id: 1,
                    date_played: "2000-01-01"
                }
            }, {token: tokenData.data.SignIn.token || ""});
        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('Should be able to create a week', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "weekCreateRequest": {
                    season_id: 1,
                    date_played: "2001-01-01"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('WeekCreate');
        expect(data.data.WeekCreate).to.have.property('date_played');
        expect(data.data.WeekCreate.date_played).to.equal("2001-01-01T05:00:00.000Z");
    });

    it('Should be able to edit a week', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "weekEditRequest": {
                    week_id: 1,
                    date_played: "2001-02-03"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('WeekEdit');
        expect(data.data.WeekEdit).to.have.property('date_played');
        expect(data.data.WeekEdit.date_played).to.equal("2001-02-03T05:00:00.000Z");
    });

    it('Should be able to delete a week', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekCreate.graphql"), 'UTF-8');
        const newData = await queryServer(query,
            {
                "weekCreateRequest": {
                    season_id: 1,
                    date_played: "2001-02-10"
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(newData.data).to.have.property('WeekCreate');
        expect(newData.data.WeekCreate).to.have.property('week_id');

        const deleteQuery = readFileSync(join(__dirname, "../src/resolvers/week/mutation/WeekDelete.graphql"), 'UTF-8');
        const data = await queryServer(deleteQuery,
            {
                "weekDeleteRequest": {
                    week_id: newData.data.WeekCreate.week_id
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('WeekDelete');
        expect(data.data.WeekDelete).to.have.property('week_id');
        expect(data.data.WeekDelete.week_id).to.equal(newData.data.WeekCreate.week_id.toString());
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


    it('Should fetch a specific week', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/week/query/Week.graphql"), 'UTF-8');
        const data = await queryServer(query,
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
        const query = readFileSync(join(__dirname, "../src/resolvers/week/query/WeeksBySeason.graphql"), 'UTF-8');
        const data = await queryServer(query,
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