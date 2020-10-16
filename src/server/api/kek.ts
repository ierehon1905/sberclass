import { Router, Request, Response } from 'express';

const router = Router();

router.get('/kek', (req: Request, res: Response) => {
    res.json({ result: 'pee pee poo poo check' });
});


export default router;