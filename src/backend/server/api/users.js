import { Router } from 'express'
import prisma from '../lib/prisma.js';
import bcyrpt from 'bcrypt'

const saltRounds = 2
const router = Router()

// Get all users, mostly a helper route for developing
router.get("/all", async (req, res) => {
	const count = await prisma.users.count();
	if (count == 0){
		res.status(404).send("No users in the database")
	} else {
		const users = await prisma.users.findMany();
		res.status(200).send(users);
	}
});

// Logging with user information - Using post so request body is encrypted with user info
router.post("/login", async (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;

	console.log("User's email: ", email);
	// Finds a user based on the email only, and compares the password after
	const user = await prisma.users.findUnique({where: {email: email}});
	console.log("returned ", user, " after searching for matching user");
	
	if (user != null){
		const hashedPassword = user.password;
		bcyrpt.compare(password, hashedPassword, (err, result) => {
			if (err) throw err;
			if (result) {
				console.log("Passwords match!");
				const resBody = {
					id: user.id,
					message: "User found!"
				};
				res.status(200).send(resBody);
			} else {
				res.status(400).send("Passwords don't match.");
			}
		});
	} else {
		res.status(404).send("User not found.");
	}
});


// Posting user information to database (first-time sign-in / sign-up)
router.post("/signup", async (req, res) => {

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;

	// 2 salt rounds, could change to be random per user for better encyrption
	const hashedPassword = await bcyrpt.hash(password, saltRounds); 
	console.log("hashed password: ", hashedPassword);

	const userData = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: hashedPassword
	}

	console.log("User data being added to database: ", userData);

	try {
		const user = await prisma.users.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hashedPassword
			}
		});
		res.status(201).send("Sign-up successful! User created.");
	} catch (err) {
		res.status(400).send("Error signing up.");
		throw(err);
	}

});

export default router