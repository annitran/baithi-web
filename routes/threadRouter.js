const express = require('express');
const router = express.Router();
const controller = require('../controllers/threadController');

router.get('/', controller.index);
router.get('/profile', controller.profile);
router.get('/thread/:id', controller.threadDetail);

router.post('/thread/:id', controller.addComment);

module.exports = router;