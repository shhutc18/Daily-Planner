const router = require('express').Router();

// const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes');
const authRouter = require('./auth');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/', authRouter);

module.exports = router;
