export const produceEvent = (type: string, data: any): any => {
    const event: any = {
        type,
        data: {
            clientRequestId: '1234567',
            ...data
        }
    };

    // mimc a change here
    // event.data.total = event.data.totals || 0;
    // delete event.data.totals;

    return event;
};

