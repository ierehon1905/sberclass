import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import { authMiddleware } from './middleware/auth';
import { loggerMiddleware } from './middleware/logger';
import kekApi from './api/kek';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(authMiddleware)
app.use(loggerMiddleware);


app.use('/kekApi', kekApi);

const PORT = 4000;

app.set('port', PORT);
app.listen(PORT);

export default app;
