const {
  Router
} = require('express');
const postsRouter = require('./twitter');
const identityRouter = require('./identities');

const router = Router();
router.use('/posts', postsRouter);
router.use('/identity', identityRouter);

module.exports = router;
