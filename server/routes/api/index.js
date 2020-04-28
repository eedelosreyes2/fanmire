
const { Router } = require('express');
const postsRouter = require('./posts');
const identityRouter = require('./identities');

const router = Router();
router.use('/posts', postsRouter);
router.use('/identity', identityRouter);

module.exports = router;
