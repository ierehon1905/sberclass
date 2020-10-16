import formatCurl from 'format-curl';

import { Request, Response } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: Function): void {
    const host = `${req.hostname}:${req.app.get('port')}`;
    const url = `${host}${req.path}`;

    const headers = {
        ...req.headers,
    };

    // curl does not works with this header hz
    delete headers['content-length'];

    const curl = formatCurl(url, { ...req, port: req.app.get('port'), headers });

    console.log('[HTTP REQUEST]');
    console.log(curl);

    next();
}