import { Response, Request, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // @ts-ignore
    req.authToken = 'kek';
    next()
}