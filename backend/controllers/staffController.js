const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { staff } = new PrismaClient();

//? Post - register student
//@descr Register
//@route POST /api/student
//@access  public

// //! create json web token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

//! get new staff
const newStaff = asyncHandler(async (req, res, next) => {
	try {
		res.render('staff/newStaff', { title: 'New Staff' });
	} catch (error) {
		next(error);
	}
});

//! Post: adding a new Staff
const newStaffPost = asyncHandler(async (req, res, next) => {
	const { password, username } = req.body;
	try {
		const userExists = await staff.findUnique({
			where: {
				username,
			},
			select: {
				username: true,
				email: true,
			},
		});

		if (userExists) {
			const error = 'user already exists';
			return res.render('staff/newStaff', { error });
		}

		//hash password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		//? Create new Student user
		const newStaff = await staff.create({
			data: { ...req.body, password: hashPassword, userRoleId: Number(3) },
		});

		//const token = createToken(newStaff.id);
		//res.cookie('jwt', token, { httpOnly: true });

		const alert = 'New Staff added successfully';

		res.render('staff/newStaff', { alert });
	} catch (error) {
		//const errors = handleErrors(error);
		//console.log(errors);
		const errorAlert = error.message;
		res.render('staff/newStaff', { errorAlert, title: 'New Staff' });
		next(error);
	}
});

const loginStaff = asyncHandler(async (req, res) => {});

//? Get all Staff from db
const getStaff = asyncHandler(async (req, res, next) => {
	try {
	} catch (error) {}
});

//? Get all Staff from db
const getAllStaff = asyncHandler(async (req, res, next) => {
	try {
		const staffList = await staff.findMany({ include: { userrole: true } });

		res.render('staff/allstaff', { staffList, title: 'All staff' });
	} catch (error) {
		next(error);
	}
});

const getEditStaff = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const staffList = await staff.findMany({
			where: {
				id: Number(id),
			},
		});
		res.render('staff/editStaff', { staffList });
	} catch (error) {
		next(error);
	}
});

const updateStaff = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const staffUpdate = await staff.update({
			where: {
				id: Number(id),
			},
			data: {
				...req.body,
			},
		});

		res.redirect('/allstaff');
	} catch (error) {
		next(error);
	}
});

//!Delete a staff
const deleteStaff = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		await staff.delete({
			where: {
				id: Number(id),
			},
		});
		res.redirect('/allstaff');
	} catch (error) {
		next(error);
	}
});

module.exports = {
	newStaff,
	loginStaff,
	getStaff,
	getAllStaff,
	deleteStaff,
	newStaffPost,
	getEditStaff,
	updateStaff,
};
