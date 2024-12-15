const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.get('/', controller.profile);

module.exports = router;