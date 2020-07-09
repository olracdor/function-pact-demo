import { MessageProviderPact } from '@pact-foundation/pact';
import { produceEvent } from '../../src/message-provider/message-producer';
import * as path from 'path';

const providerVersion = '1.0.0-b4';

describe('Message provider tests', () => {
    const providerPact = new MessageProviderPact({
        messageProviders: {
            'a request to send a pricingevent': () => produceEvent('pricingevent', {price: 100}),
            'a request to send a saleevent': () => produceEvent('saleevent', {totals: 1000})
        },
        logLevel: 'info',
        provider: 'MessagePactEventProvider',
        pactUrls: [
            path.resolve(process.cwd(), 'pacts', 'messagepacteventconsumerprice-messagepacteventprovider.json'),
            path.resolve(process.cwd(), 'pacts', 'messagepacteventconsumersale-messagepacteventprovider.json')
        ],

        // pactBrokerUrl: 'http://localhost:9292/',
        // pactBrokerUsername: 'pact',
        // pactBrokerPassword: 'password',

        publishVerificationResult: true,
        pactBrokerUrl: process.env.PACT_BROKER,
        pactBrokerToken: process.env.PACT_TOKEN,
        providerVersion
    });

    describe('send an event', () => {
        it('sends a valid event', () => {
            return providerPact.verify();
        });
    });
});



