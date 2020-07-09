import { consumeEvent } from '../../src/message-consumer/message-consumer-price-service';
import { MessageConsumerPact, synchronousBodyHandler } from '@pact-foundation/pact';
import * as path from 'path';
import { like, term } from '@pact-foundation/pact/dsl/matchers';

describe('Message consumer tests', () => {
    const messagePact = new MessageConsumerPact({
        consumer: 'MessagePactEventConsumerPrice',
        dir: path.resolve(process.cwd(), 'pacts'),
        provider: 'MessagePactEventProvider',
        pactfileWriteMode: 'update'
    });

    describe('receive a pact event', () => {
        it('accepts a valid event', () => {
            return messagePact
                .expectsToReceive('a request to send a pricingevent')
                .withContent(
                    {
                        type: term({generate: 'pricingevent', matcher: '^pricingevent$'}),
                        data: {
                            clientRequestId: like('12345'),
                            price: like(100)
                        }
                    }
                ).verify(synchronousBodyHandler(consumeEvent));
        });
    });
});
