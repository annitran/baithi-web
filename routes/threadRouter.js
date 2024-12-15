const express = require('express');
const router = express.Router();
const controller = require('../controllers/threadController');

router.get('/:id', controller.threadDetail);

router.post('/:id', controller.addComment);

module.exports = router;