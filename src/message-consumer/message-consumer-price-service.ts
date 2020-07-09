export const consumeEvent = (event: any): boolean => {
    console.log('consuming event', event);

    if (!event.type || event.type !== 'pricingevent') {
        throw new Error(`Invalid event type: ${event.type}`);
    }

    if (!event.data) {
        throw new Error('event data is not provided');
    }

    if (!event.data.clientRequestId) {
        throw new Error('clientRequestId not provided');
    }

    if (typeof event.data.price !== 'number') {
        throw new Error(`price must be a number! Invalid value: ${event.data.price}`);
    }
    return true;
};
