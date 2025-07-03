// routes/feedRoutes.js
const express = require('express');
const router = express.Router();
const { getStories, getFeed } = require('../controllers/feedController');

router.get('/stories', getStories);
router.get('/',        getFeed);

module.exports = router;
