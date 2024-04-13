const express = require('express');
const router = express.Router();
const {
	getRegister,
	registerStudent,
	getLoginStudent,
	loginStudent,
	getStudent,
	logout,
	getAllStudent,
	deleteStudent,
	getEditStudent,
	updateEditStudent,
} = require('../controllers/studentController');

const { protect } = require('../middleware/authMiddleware');

router.get('/register', getRegister);
router.post('/registerpost', registerStudent);

router.get('/login', getLoginStudent);
router.post('/login', loginStudent);

router.get('/logout', logout);

router.get('/profile/:id', protect, getStudent);
router.get('/allstudents', protect, getAllStudent);
router.get('/allstudents/:id', protect, deleteStudent);

router.get('/editstudent/:id', protect, getEditStudent);
router.post('/editstudent/:id', protect, updateEditStudent);

module.exports = router;
