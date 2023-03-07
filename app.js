import express from 'express';

import { postRouter } from './src/routes/posts.router.js';

const app = express();

app.use('/', postRouter);

app.listen(3000);
