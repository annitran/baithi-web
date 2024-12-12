const express = require('express');
const router = express.Router();
const controller = require('../controllers/threadController');

router.get('/', controller.index);
router.get('/profile', controller.profile);
router.get('/thread/:id', controller.threadDetail);

module.exports = router;