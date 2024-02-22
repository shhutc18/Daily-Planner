const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dayRoutes = require('./dayRoutes');
const eventRoutes = require('./eventRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/', userRoutes);
router.use('/', dayRoutes);
router.use('/', eventRoutes);
router.use('/', todoRoutes);



module.exports = router;