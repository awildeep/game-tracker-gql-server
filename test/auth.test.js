const expect = require('chai').expect;
const {signInAdmin, signInNonAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const database = require('./helpers/database');

describe('Auth', () => {
    beforeEach(() => database.seed.run(config));

    it('should deny an non-admin to create a user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/auth/mutation/UserCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "userCreateRequest": {
                    username: "test@test.com",
                    name: "test user",
                    password: "Test password",
                    admin: false,
                    can_login: false
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('should allow an admin to create a user', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/auth/mutation/UserCreate.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "userCreateRequest": {
                    username: "test@test.com",
                    name: "test user",
                    password: "Test password",
                    admin: false,
                    can_login: false
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('UserCreate');
        expect(data.data.UserCreate).to.have.property('username');
        expect(data.data.UserCreate.username).to.equal("test@test.com");
    });


    it('should deny a non-admin to edit a user', async () => {
        const tokenData = await signInNonAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/auth/mutation/UserEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "userEditRequest": {
                    user_id: "2",
                    username: "testing@test.com",
                    name: "test user",
                    password: "Test password",
                    admin: false,
                    can_login: false
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.errors).to.have.be.instanceof(Array);
        expect(data.errors[0].message).to.equal('Access denied.');
    });

    it('should allow an admin to edit a user', async () => {
        const tokenData = await signInAdmin();
        const query = readFileSync(join(__dirname, "../src/resolvers/auth/mutation/UserEdit.graphql"), 'UTF-8');
        const data = await queryServer(query,
            {
                "userEditRequest": {
                    user_id: "2",
                    username: "testing@test.com",
                    name: "test user",
                    password: "Test password",
                    admin: false,
                    can_login: false
                }
            }, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('UserEdit');
        expect(data.data.UserEdit).to.have.property('username');
        expect(data.data.UserEdit.username).to.equal("testing@test.com");
    });

    it('Should allow a sign in', async () => {
        const data = await signInAdmin();
        expect(data.data).to.have.property('SignIn');
        expect(data.data.SignIn).to.have.property('token');
        expect(data.data.SignIn.token).to.have.lengthOf.above(1);
    });
    it('Should allow a user to see who they are', async () => {
        const tokenData = await signInAdmin();

        const query = readFileSync(join(__dirname, "../src/resolvers/auth/query/me.graphql"), 'UTF-8');

        expect(tokenData.data.SignIn.token).to.have.lengthOf.above(1);
        const data = await queryServer(query, {}, {token: tokenData.data.SignIn.token || ""});

        expect(data.data).to.have.property('Me');
        expect(data.data.Me).to.have.property('username');
        expect(data.data.Me).to.have.property('user_id');
        expect(data.data.Me).to.have.property('admin');
        expect(data.data.Me.username).to.equal('awildeep@gmail.com');
    });
});