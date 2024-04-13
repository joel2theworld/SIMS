const { PrismaClient } = require('@prisma/client');
const { incidentpost, staff, studentreg } = new PrismaClient();
const { userLoggedIn } = require('../middleware/authMiddleware');

const viewHome = async (req, res, next) => {
	res.render('home', { title: 'Home' });
};

const dashboard = async (req, res, next) => {
	const userLogin = userLoggedIn(req.cookies.jwt);
	//? Get count of pending incidents
	const pendingIncidents = await studentreg.findUnique({
		where: {
			id: userLogin,
		},

		select: {
			incidentpost: {
				where: {
					statusId: Number(1),
				},
			},
		},
	});

	const adminPendingInc = await incidentpost.findMany({
		where: {
			statusId: Number(1),
		},
	});

	//! Admin resolved count
	const adminResolvedInc = await incidentpost.findMany({
		where: {
			statusId: Number(2),
		},
	});

	//# Total Cases
	const adminTotalInc = await incidentpost.findMany();

	//? Get count of resolved incidents for students

	const resolvedIncidents = await studentreg.findUnique({
		where: {
			id: userLogin,
		},
		select: {
			incidentpost: {
				where: {
					statusId: Number(2),
				},
			},
		},
	});

	const staffList = await staff.findMany();
	const studentList = await studentreg.findMany();

	//? Get the count of all staff
	const staffCount = staffList.length;
	const studentCount = studentList.length;
	const pendingCount = pendingIncidents.incidentpost.length;
	const resolveCount = resolvedIncidents.incidentpost.length;
	const adminResolvedCount = adminResolvedInc.length;
	const adminPendingCount = adminPendingInc.length;
	const adminTotalCount = adminTotalInc.length;

	res.render('dashboard', {
		pendingCount,
		resolveCount,
		staffCount,
		studentCount,
		adminPendingCount,
		adminResolvedCount,
		adminTotalCount,
		title: 'Dashboard',
	});
};

module.exports = { viewHome, dashboard };
