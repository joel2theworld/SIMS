const express = require('express');
const router = express.Router();
const {
	pendingIncident,
	resolveIncident,
	resolveIncidentPost,
	deleteIncidentPost,
	postNewIncident,
	incidentDetails,
	editIncidentPost,
	getEditIncidentPost,
} = require('../controllers/incidentPostController');

const { protect } = require('../middleware/authMiddleware');

router.route('/dashboard').post(protect, postNewIncident);

router
	.route('/pending')
	.get(protect, pendingIncident)
	.post(protect, pendingIncident);

router
	.route('/resolve')
	.get(protect, resolveIncident)
	.post(protect, resolveIncident);

router.get('/resolve/:id', protect, resolveIncidentPost);
router.get('/dashboard/:id', protect, deleteIncidentPost);
router.get('/editpost/:id', protect, getEditIncidentPost);
router.post('/updatepost/:id', protect, editIncidentPost);
getEditIncidentPost;
router.route('/incidentdetails/:id').get(protect, incidentDetails);

module.exports = router;
