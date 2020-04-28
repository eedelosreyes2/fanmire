const {
  Router
} = require('express');

const facebookRouter = require('./facebook');
const instagramRouter = require('./instagram');

const router = new Router();
router.use('/facebook', facebookRouter);
router.use('/instagram', instagramRouter);

module.exports = router;