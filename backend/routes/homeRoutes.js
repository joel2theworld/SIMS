const express = require('express');
const router = express.Router();

const { viewHome, dashboard } = require('../controllers/homeController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, viewHome);

router.route('/dashboard').get(protect, dashboard);

module.exports = router;
