import type {IncomingMessage, ServerResponse} from 'http';

export function geocode(req: IncomingMessage, res: ServerResponse) : void {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        lat: 38.928,
        lng: -94.753
    }));
}