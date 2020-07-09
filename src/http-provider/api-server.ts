import express from 'express';
import { StructuredHTTPReceiver } from 'cloudevents-sdk/v1';
import bodyParser from 'body-parser';
import { serverPort } from '../common/common-util';

const app = express();
app.use(bodyParser.json());

app.post('/api/event-facade', (req, res) => {
    res.set('Content-Type', 'application/json');
    // console.log(req.body);
    if (!req.body) {
        res.status(400);
        res.send({error: {message: 'payload is empty'}});
        return;
    }
    const inputEventData = req.body;

    console.log('CloudEvent', inputEventData);

    const cloudEventContentType = 'application/cloudevents+json';

    try {
        // validate event data
        new StructuredHTTPReceiver().parse(inputEventData,
            {'Content-Type': cloudEventContentType});
        res.status(200);
        res.send({status: 'ACCEPTED', message: 'the event to be processed'});
    } catch (e) {
        res.status(400);
        res.send(e);
    }
});

const server = app.listen(serverPort, () => {
    console.log('server start ...');
});


module.exports = server;
