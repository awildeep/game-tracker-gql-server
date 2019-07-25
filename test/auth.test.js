const expect = require('chai').expect;
const {signInAdmin} = require('./helpers/signIn');
const {queryServer} = require('./helpers/queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

describe('Auth', () => {
    it('Should allow a sign in', async () => {
        const data = await signInAdmin();
        expect(data).to.have.property('SignIn');
        expect(data.SignIn).to.have.property('token');
        expect(data.SignIn.token).to.have.lengthOf.above(1);
    });
    it('Should allow a user to see who they are', async () => {
        const tokenData = await signInAdmin();

        const meQuery = readFileSync(join(__dirname, "../src/resolvers/auth/query/me.graphql"), 'UTF-8');

        expect(tokenData.SignIn.token).to.have.lengthOf.above(1);
        const data = await queryServer(meQuery, {}, {token: tokenData.SignIn.token || ""});
        expect(data).to.have.property('Me');
        expect(data.Me).to.have.property('username');
        expect(data.Me).to.have.property('user_id');
        expect(data.Me).to.have.property('admin');
        expect(data.Me.username).to.equal('awildeep@gmail.com');
    });
});