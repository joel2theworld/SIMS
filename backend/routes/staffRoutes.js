const express = require('express');
const router = express.Router();
const {
	newStaff,
	newStaffPost,
	loginStaff,
	getStaff,
	getAllStaff,
	deleteStaff,
	getEditStaff,
	updateStaff,
} = require('../controllers/staffController');

const { protect } = require('../middleware/authMiddleware');

router.get('/newstaff', protect, newStaff);
router.post('/newstaff', protect, newStaffPost);

router.get('/editstaff/:id', protect, getEditStaff);
router.post('/editstaff/:id', protect, updateStaff);

router.post('/login', loginStaff);
router.get('/admin', protect, getStaff);
router.get('/allstaff', protect, getAllStaff);
router.get('/allstaff/:id', protect, deleteStaff);

module.exports = router;
 