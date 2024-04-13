const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { assignincident, incidentpost, staff, userrole, studentreg } =
	new PrismaClient();

const allAssigned = asyncHandler(async (req, res, next) => {
	try {
		const assignedInc = await assignincident.findMany({
			include: { incidentpost: true, staff: true },
			orderBy: {
				createdAt: 'desc',
			},
		});

		res.render('staff/assignStaffList', { assignedInc, title: 'All Assigned' });
	} catch (error) {
		next(error);
	}
});

//! Assign incident report to staff
const getAssignInc = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const displayIncPost = await incidentpost.findMany({
			where: {
				id: Number(id),
			},
			include: { studentreg: true, status: true, incidentcategory: true },
		});

		const staffList = await staff.findMany();

		//! Check if incident post already existed
		const existIncPost = await assignincident.findMany({
			where: {
				incidentId: Number(id),
			},
			select: {
				incidentId: true,
			},
		});

		//! Incident existed Id
		// let incidentExistId = existIncPost[0].incidentId;

		res.render('staff/assignStaff', {
			displayIncPost,
			staffList,
			id,
			existInc: existIncPost.map((a) => a.incidentId),
		});
	} catch (error) {
		next(error);
	}
});

//? Assign Incident to staff
const setAssignInc = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const { staffId } = req.body;

		const newAsignStaff = await assignincident.create({
			data: { staffId: Number(staffId), incidentId: Number(id) },
		});

		await incidentpost.update({
			where: {
				id: Number(id),
			},
			data: { isAssign: Number(1) },
		});

		res.redirect('/pending');
	} catch (error) {
		next(error);
	}
});

//? Remove Assign Incident from staff
const deleteAssignInc = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const deletedAssignInc = await assignincident.delete({
			where: {
				id: Number(id),
			},
		});
		res.json(deletedAssignInc);
	} catch (error) {
		next(error);
	}
});

//! ================================Staff===============================
const getAssignRole = asyncHandler(async (req, res, next) => {
	const staffList = await staff.findMany();
	const userRoles = await userrole.findMany();

	res.render('staff/newRole', {
		staffList,
		userRoles,
		title: 'Assign user Role',
	});
});

//? Assign user Role to staff
const assignRolePost = asyncHandler(async (req, res, next) => {
	try {
		const { id, userRoleId } = req.body;

		const updateStaff = await staff.update({
			where: {
				id: Number(id),
			},
			data: { userRoleId: Number(userRoleId) },
		});
		const alert = 'User Role updated successfully';
		res.render('staff/newRole', { alert });
	} catch (error) {
		next(error);
	}
});

//!========================Student================
const getAssignStudRole = asyncHandler(async (req, res, next) => {
	const studentList = await studentreg.findMany();
	const userRoles = await userrole.findMany();

	res.render('students/newStudentRole', {
		studentList,
		userRoles,
		title: 'Assign user Role',
	});
});

//? Assign user Role to staff
const assignRoleStdPost = asyncHandler(async (req, res, next) => {
	try {
		const { id, userRoleId } = req.body;

		const updateStudent = await studentreg.update({
			where: {
				id: Number(id),
			},
			data: { userRoleId: Number(userRoleId) },
		});
		const alert = 'User Role updated successfully';
		res.render('students/newStudentRole', { alert });
	} catch (error) {
		next(error);
	}
});

module.exports = {
	getAssignInc,
	setAssignInc,
	deleteAssignInc,
	allAssigned,
	getAssignRole,
	assignRolePost,
	getAssignStudRole,
	assignRoleStdPost,
};
