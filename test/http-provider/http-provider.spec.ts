import { Verifier } from '@pact-foundation/pact';
import { VerifierOptions } from '@pact-foundation/pact/dsl/verifier';
import * as path from 'path';
import { serverPort } from '../../src/common/common-util';

const providerBaseUrl = `http://localhost:${serverPort}`;

describe('CloudEvent HTTP Provider', () => {

    // start provider server
    let server: any;
    beforeEach(() => {
        server = require('../../src/http-provider/api-server');
    });
    afterEach((done) => {
        server.close(done);
    });

    it('Verify Pact HTTP', async () => {
        const verifyOprions: VerifierOptions = {
            provider: 'http_provider',
            providerBaseUrl,
            // providerStatesSetupUrl: `${providerBaseUrl}/init`,
            pactUrls: [path.resolve(__dirname, '../../pacts/http_consumer_1-http_provider.json')],

            publishVerificationResult: true,
            pactBrokerUrl: process.env.PACT_BROKER,
            pactBrokerToken: process.env.PACT_TOKEN,

            // pactBrokerUrl: 'http://localhost:9292/',
            // pactBrokerUsername: 'pact',
            // pactBrokerPassword: 'password',
            providerVersion: '2.0.0-a'
        };

        const verifyResult = await new Verifier().verifyProvider(verifyOprions);
        console.log('Pact HTTP Verification Complete!');
        console.log(verifyResult);
    });

});
