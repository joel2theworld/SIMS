const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { studentreg } = new PrismaClient();

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { regNo: '', password: '' };

	// incorrect regNo
	if (err.message === 'incorrect regNo') {
		errors.regNo = 'That regNo is not registered';
	}

	// incorrect password
	if (err.message === 'incorrect password') {
		errors.password = 'That password is incorrect';
	}

	// duplicate regNo error
	if (err.code === 11000) {
		errors.regNo = 'that regNo is already registered';
		return errors;
	}

	// validation errors
	if (err.message.includes('user validation failed')) {
		// console.log(err);
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(val);
			// console.log(properties);
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

//! create json web token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//? Post - register student
//@descr Register
//@route POST /api/student
//@access  public
//? get register page to display
const getRegister = asyncHandler(async (req, res, next) => {
	res.render('register', { title: 'Register' });
});

const getLoginStudent = asyncHandler(async (req, res, next) => {
	res.render('login', { title: 'Login' });
});

//!==================================

//? register user into the database
const registerStudent = asyncHandler(async (req, res) => {
	const { password, regNo, email } = req.body;
	try {
		const userExists = await studentreg.findUnique({
			where: {
				regNo,
			},
			select: {
				email: true,
				regNo: true,
			},
		});

		if (userExists) {
			const error = 'User already Existed';
			return res.render('register', { error });
		} else {
			//hash password
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);

			//? Create new Student user
			const newStudentUser = await studentreg.create({
				data: { ...req.body, password: hashPassword, userRoleId: Number(1) },
			});

			const token = createToken(newStudentUser.id);
			res.cookie('jwt', token, { httpOnly: true });

			res.redirect('/login');
		}
	} catch (error) {
		const errors = handleErrors(error);
		// res.status(400).json({ errors });
		res.render('register');
	}
});

//?@descr Authenticate a student
//?@route POST /api/student/login
//?@access  public

//! Login with regno and password
const loginStudent = asyncHandler(async (req, res) => {
	const { regNo, password } = req.body;

	try {
		const user = await studentreg.findUnique({ where: { regNo: regNo } });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = createToken(user.id);
			res.cookie('jwt', token, { httpOnly: true });
			res.redirect('/dashboard');
		} else {
			// res.status(400);
			const error = 'Invalid Credentials';
			res.render('login', { error });
		}
	} catch (error) {
		res.render('login');
		// const errors = handleErrors(error);
		// res.status(400).json({ errors });
	}
});

//! get user from user
const getStudent = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userProfile = await studentreg.findMany({
		where: {
			id: Number(id),
		},
		include: {
			userrole: true,
		},
	});

	// res.status(200).json(user);
	res.render('viewProfile', { userProfile });
});

//! get All Students
const getAllStudent = asyncHandler(async (req, res) => {
	const studentList = await studentreg.findMany();

	res.render('students/allStudents', { studentList, title: 'All Students' });
});

//! Logout to application
const logout = asyncHandler(async (req, res) => {
	res.cookie('jwt', '');
	res.redirect('/login');
});

//! Delete Student
const deleteStudent = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		await studentreg.delete({
			where: {
				id: Number(id),
			},
		});
		res.redirect('/allstudents');
	} catch (error) {
		next(error);
	}
});

//! =============Update Student ====================
//* get edit students
const getEditStudent = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;

		const studentList = await studentreg.findMany({
			where: {
				id: Number(id),
			},
		});
		res.render('students/editStudent', { studentList });
	} catch (error) {
		next(error);
	}
});

//* Post edit students
const updateEditStudent = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const studentUpdate = await studentreg.update({
			where: {
				id: Number(id),
			},
			data: {
				...req.body,
			},
		});

		res.redirect('/allstudents');
	} catch (error) {
		next(error);
	}
});

module.exports = {
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
};
