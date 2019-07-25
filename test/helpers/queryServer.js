const fetch = require('node-fetch');

const queryServer = async (query, variables, config) => {
    let authorization = '';
    if (config && config.token) {
        authorization = config.token;
    }
    let host = 'http://localhost:4000/graphql';
    if (config && config.host) {
        host = config.host;
    }

    const data = await fetch(host, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': host,
            authorization
        },
        body: JSON.stringify({query, variables})
    })
        .then(r => r.json());
    return data.data;
};

module.exports = {
    queryServer
};
