const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const authRouter = require('./auth');
const apiRoutes = require('./api/index');

router.use('/', homeRoutes);
router.use('/', authRouter);
router.use('/api', apiRoutes);

module.exports = router;
