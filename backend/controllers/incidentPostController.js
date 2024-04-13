const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { incidentpost, feedback, assignincident, studentreg } =
	new PrismaClient();
const { userLoggedIn } = require('../middleware/authMiddleware');

//? get Pending Incidents
const pendingIncident = async (req, res, next) => {
	try {
		//!User logged in data
		const { search } = req.body;
		const userLogin = userLoggedIn(req.cookies.jwt);
		const pending = await studentreg.findUnique({
			where: {
				id: userLogin,
			},
			select: {
				incidentpost: {
					where: {
						statusId: Number(1),
						description: {
							contains: search,
						},
					},

					include: { incidentcategory: true, studentreg: true },
					orderBy: {
						createdAt: 'desc',
					},
				},
				userrole: true,
			},
		});

		let pendingIncidents = pending.incidentpost;

		//! Checking not assigned posts in the incident model
		const isNotAssigned = await incidentpost.findMany({
			where: {
				isAssign: Number(0),
			},
		});

		//! Checking for assigned posts in the incident model
		const isAssigned = await incidentpost.findMany({
			where: {
				isAssign: Number(1),
			},
		});

		//! Admin pending incident reports
		const adminPendingInc = await incidentpost.findMany({
			where: {
				statusId: Number(1),
				description: {
					contains: search,
				},
			},
			include: {
				studentreg: true,
				incidentcategory: true,
				assignincident: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		res.render('incidents/pendingIncident', {
			pendingIncidents,
			adminPendingInc,
			isNotAssigned,
			isAssigned,
			title: 'Pending incidents',
		});
	} catch (error) {
		next(error);
	}
};

//? get Resolved Incidents
const resolveIncident = async (req, res, next) => {
	try {
		const { search, id } = req.body;
		const userLogin = userLoggedIn(req.cookies.jwt);

		const resolve = await studentreg.findUnique({
			where: {
				id: userLogin,
			},

			select: {
				incidentpost: {
					where: {
						statusId: Number(2),
						description: {
							contains: search,
						},
					},
					include: { incidentcategory: true, studentreg: true },
				},
				userrole: true,
			},
		});

		const resolvedIncidents = resolve.incidentpost;

		//! Admin resolved incident
		const adminResolvedInc = await incidentpost.findMany({
			where: {
				statusId: Number(2),
				description: {
					contains: search,
				},
			},
			include: {
				studentreg: true,
				incidentcategory: true,
				assignincident: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		//? Feedback Count
		const feedbackList = await feedback.findMany({});
		const feedbackCount = feedbackList.length;

		res.render('incidents/resolvedIncident', {
			resolvedIncidents,
			adminResolvedInc,
			feedbackCount,
			title: 'Resolved Incidents',
		});
	} catch (error) {
		next(error);
	}
};

//! New Post
const postNewIncident = async (req, res, next) => {
	const { categoryId, studentId } = req.body;
	try {
		const newIncidentPost = await incidentpost.create({
			data: {
				...req.body,
				categoryId: Number(categoryId),
				statusId: Number(1),
				studentId: Number(studentId),
				isAssign: 0,
			},
		});

		res.redirect('/pending');
	} catch (error) {
		next(error);
	}
};

const incidentDetails = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const incidentDetails = await incidentpost.findMany({
			where: {
				id: Number(id),
			},
			include: { studentreg: true, incidentcategory: true },
		});

		if (!id) {
			res.status(400).json({ msg: 'Such post does not exist' });
		}
		//? Feedback
		const feedbackList = await feedback.findMany({
			where: {
				incidentId: Number(id),
			},
		});

		//? Assigned Staff
		const assignedStaff = await assignincident.findMany({
			where: {
				incidentId: Number(id),
			},
			select: { staff: true },
		});

		//? Assigned Staff display name
		const staffAssigned =
			(await assignedStaff[0].staff.firstName) +
			' ' +
			assignedStaff[0].staff.lastName;

		res.render('incidents/detailsIncident', {
			incidentDetails,
			feedbackList,
			staffAssigned,
			assignedStaff,
			title: 'Assign staff to report',
		});
	} catch (error) {
		next(error);
	}
});

//? Resolved incident Post
const resolveIncidentPost = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		await incidentpost.update({
			where: {
				id: Number(id),
			},
			data: { ...req.body, statusId: Number(2) },
		});
		res.redirect('/resolve');
	} catch (error) {
		next(error);
	}
});

//* Update Incident
const getEditIncidentPost = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const incidentPosts = await incidentpost.findMany({
			where: {
				id: Number(id),
			},
		});

		res.render('incidents/editIncidentPost', { incidentPosts });
	} catch (error) {
		next(error);
	}
});

const editIncidentPost = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const { categoryId, studentId } = req.body;
		const updatePost = await incidentpost.update({
			where: {
				id: Number(id),
			},
			data: {
				...req.body,
				categoryId: Number(categoryId),
				studentId: Number(studentId),
			},
		});

		res.redirect('/pending');
	} catch (error) {
		next(error);
	}
});

//? Delete incident Post
const deleteIncidentPost = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		await incidentpost.delete({
			where: {
				id: Number(id),
			},
		});

		res.redirect('/pending');
	} catch (error) {
		next(error);
	}
});

module.exports = {
	postNewIncident,
	deleteIncidentPost,
	resolveIncidentPost,
	pendingIncident,
	resolveIncident,
	incidentDetails,
	editIncidentPost,
	getEditIncidentPost,
};
