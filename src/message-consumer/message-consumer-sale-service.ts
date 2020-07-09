export const consumeEvent = (event: any): boolean => {
    console.log('consuming event', event);

    if (!event.type || event.type !== 'saleevent') {
        throw new Error(`Invalid event type: ${event.type}`);
    }

    if (!event.data) {
        throw new Error('event data is not provided');
    }

    if (!event.data.clientRequestId) {
        throw new Error('clientRequestId not provided');
    }

    if (typeof event.data.totals !== 'number') {
        throw new Error(`totals must be a number! Invalid value: ${event.data.totals}`);
    }
    return true;
};
