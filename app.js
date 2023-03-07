import express from 'express';

import { postRouter } from './src/routes/posts.router.js';

const app = express();

app.use('/', postRouter);

app.listen(3000, () =>
  console.log(`Server running on http://localhost:${3000}`)
);

//process listeners to stop app
process.on('SIGINT', function () {
  process.exit();
});

process.on('SIGTERM', function () {
  process.exit();
});
