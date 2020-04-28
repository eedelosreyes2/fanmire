const Router = require('express');
const identityRouter = require('./identities');

const router = Router();
router.use('/identity', identityRouter);

module.exports = router;