import express from 'express';

import postController from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/', postController.get);

export { router as postRouter };
