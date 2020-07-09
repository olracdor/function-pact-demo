import axios from 'axios';

export class HttpConsumerService {
    private readonly url: string;
    private readonly port: number;

    constructor(endpoint: any) {
        this.url = endpoint.url;
        this.port = endpoint.port;
    }

    sendCloudEvent(eventData: any): Promise<any> {
        return axios.post(`${this.url}:${this.port}/api/event-facade`, eventData, {
            headers: {'Content-Type': 'application/json'}
        });
    }
}
