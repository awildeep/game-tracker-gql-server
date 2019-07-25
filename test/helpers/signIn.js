const {queryServer} = require('./queryServer');
const {readFileSync} = require('fs');
const {join} = require('path');

const signIn = async (username, password) => {
    const signInMutation = readFileSync(join(__dirname, "../../src/resolvers/auth/mutation/signin.graphql"), 'UTF-8');
    const data = await queryServer(signInMutation, {
        "signInRequest": {
            "username": username,
            "password": password
        }
    });
    return data;
};

const signInAdmin = async () => {
    return await signIn("awildeep@gmail.com", "testing1");
};

module.exports = {
    signIn,
    signInAdmin
};
