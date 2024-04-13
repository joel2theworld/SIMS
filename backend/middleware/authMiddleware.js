const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { PrismaClient } = require('@prisma/client');
const { studentreg, userrole, incidentpost, assignincident } =
	new PrismaClient();

const protect = asyncHandler(async (req, res, next) => {
	let token = req.cookies.jwt;

	if (token) {
		try {
			//! Decode token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			//get User from the token
			const user = await studentreg.findUnique({
				where: {
					id: decoded.id,
				},
				include: { userrole: true, incidentpost: true },
			});

			//! Check for Admin users
			const Admin = await userrole.findUnique({
				where: {
					id: user.userRoleId,
				},
			});

			//? Assign Incidents
			const assignInc = await assignincident.findMany();
			res.locals.assignedInc = assignInc.map((a) => a.incidentId);

			res.locals.isAdmin = Admin.id === 2;
			res.locals.user = user;

			next();
		} catch (error) {
			res.status(401);
			res.locals.user = null;
			res.redirect('/login');
		}
	}

	if (!token) {
		res.status(401);
		res.locals.user = null;
		res.redirect('/login');
	}
});

//! Check login user
const userLoggedIn = (token) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (decoded) {
		return decoded.id;
	}
};

module.exports = { protect, userLoggedIn };
