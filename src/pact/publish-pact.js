let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],

    // Publish a single file
    // pactFilesOrDirs: [
    //     path.resolve(process.cwd(), 'pacts', 'http_consumer_1-http_provider.json'),
    //     path.resolve(process.cwd(), 'pacts', 'messagepacteventconsumerprice-messagepacteventprovider.json'),
    //     path.resolve(process.cwd(), 'pacts', 'messagepacteventconsumersale-messagepacteventprovider.json')
    // ],

    // use local broker
    // pactBroker: "http://localhost:9292/",
    // pactBrokerUsername: "pact",
    // pactBrokerPassword: "password",

    // use pact flow broker
    pactBroker: process.env.PACT_BROKER,
    pactBrokerToken: process.env.PACT_TOKEN,
    consumerVersion: '1.0.0-d'
};

publisher.publishPacts(opts).then(() => console.log("Pacts successfully published"));
