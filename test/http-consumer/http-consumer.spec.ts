import { expect } from 'chai';
import { Interaction, Pact } from '@pact-foundation/pact';
import * as path from 'path';
import { like } from '@pact-foundation/pact/dsl/matchers';
import { HttpConsumerService } from '../../src/http-consumer/http-consumer-service';

describe('The CloudEvent Pact API', () => {
    const url = 'http://localhost';

    let httpConsumerService: HttpConsumerService;

    const provider = new Pact({
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        spec: 3,
        consumer: 'http_consumer_1',
        provider: 'http_provider'
    });

    before(async () => {
        await provider.setup();
        httpConsumerService = new HttpConsumerService({url, port: provider.opts.port});
    });

    after(() => provider.finalize());

    afterEach(() => provider.verify());

    describe('post /api/event-facade with valid cloud event', () => {
        const cloudEventResp = require('../data/valid-cloud-event-resp.json');
        const cloudEventRequest = require('../data/valid-cloud-event-req.json');

        before(() => {
            const interaction = new Interaction()
                // .given('some condition')
                .uponReceiving('receiving a valid CloudEvent')
                .withRequest({
                    method: 'POST',
                    path: '/api/event-facade',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(cloudEventRequest)
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: like(cloudEventResp)
                });

            return provider.addInteraction(interaction);
        });

        it('should return the correct response', async () => {
            const response = await httpConsumerService.sendCloudEvent(cloudEventRequest);
            expect(response.data).to.deep.eq(cloudEventResp);
            expect(response.status).to.eq(200);
        });
    });

    describe('post /api/event-facade with invalid cloud event', () => {
        const cloudEventResp = require('../data/invalid-cloud-event-resp.json');
        const cloudEventRequest = require('../data/invalid-cloud-event-req.json');

        before(() => {
            const interaction = new Interaction()
                // .given('some condition')
                .uponReceiving('receiving an invalid CloudEvent')
                .withRequest({
                    method: 'POST',
                    path: '/api/event-facade',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: cloudEventRequest
                })
                .willRespondWith({
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: cloudEventResp
                });

            return provider.addInteraction(interaction);
        });

        it('should return 400 response', async () => {
            try {
                await httpConsumerService.sendCloudEvent(cloudEventRequest);
            } catch (e) {
                expect(e.response.data).to.deep.eq(cloudEventResp);
                expect(e.response.status).to.eq(400);
            }
        });
    });
});
