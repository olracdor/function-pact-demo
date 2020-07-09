import { consumeEvent } from '../../src/message-consumer/message-consumer-sale-service';
import { MessageConsumerPact, synchronousBodyHandler } from '@pact-foundation/pact';
import * as path from 'path';
import { like, term } from '@pact-foundation/pact/dsl/matchers';

describe('Message consumer tests', () => {
    const messagePact = new MessageConsumerPact({
        consumer: 'MessagePactEventConsumerSale',
        dir: path.resolve(process.cwd(), 'pacts'),
        provider: 'MessagePactEventProvider',
        pactfileWriteMode: 'update'
    });

    describe('receive a pact event', () => {
        it('accepts a valid event', () => {
            return messagePact
                .expectsToReceive('a request to send a saleevent')
                .withContent(
                    {
                        type: term({generate: 'saleevent', matcher: 'saleevent$'}),
                        data: {
                            clientRequestId: like('1234567'),
                            totals: like(1000)
                        }
                    }
                ).verify(synchronousBodyHandler(consumeEvent));
        });
    });
});
