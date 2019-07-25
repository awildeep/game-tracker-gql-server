const expect = require('chai').expect;
const {queryServer} = require('./helpers/queryServer');

describe('Server', () => {
    it('Queries should be accessible', async () => {
        const data = await queryServer('query up { _ }', {});

        expect(data).to.eql({ _: true });

    });
    it('Mutations should be accessible', async () => {
        const data = await queryServer('mutation up { _ }', {});

        expect(data).to.eql({ _: true });

    });
});