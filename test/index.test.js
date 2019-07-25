const expect = require('chai').expect;
const fetch = require('node-fetch');

const queryServer = async (host, query, variables) => {
    const data = await fetch(host, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': host,
        },
        body: JSON.stringify({query, variables})
    })
        .then(r => r.json());
    return data.data;
};


describe('Auth', () => {
    it('Should return password rules', async () => {
        const data = await queryServer('http://localhost:4224', "{ AuthGetPasswordRules { rules }}", {});
        expect(data).to.have.property('AuthGetPasswordRules');
        expect(data.AuthGetPasswordRules).to.have.property('rules');
    });
    it('Should receive tokens when authenticated', async() => {
        const data = await queryServer('http://localhost:4224',
            `
                query login($AuthLoginRequest: AuthLoginRequest!) {
                  AuthLogin(authLoginRequest: $AuthLoginRequest) {
                    access_token {
                      token
                    }
                    refresh_token {
                      token
                    }
                    user {
                      user_id {
                        id
                        type
                        version
                      }
                      email
                      enabled
                    }
                  }
                }
             `,
            {
                AuthLoginRequest: {
                    username: 'grege',
                    password: 'WhatEverIWant1*'
                }
            });
        expect(data).to.have.property('AuthLogin');
        expect(data.AuthLogin).to.have.property('access_token');
        expect(data.AuthLogin.access_token).to.have.property('token');
        expect(data.AuthLogin).to.have.property('refresh_token');
        expect(data.AuthLogin.refresh_token).to.have.property('token');
    })
});