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

// Create multiple users, a helper route for developing
router.post("/many", async (req, res) => {

	// assumes req.body is an array of json objects with the proper fields

	try {
		const result = await prisma.users.createMany({
			data: req.body,
			skipDuplicates: true,
		});
		const count = result.count;
		res.status(200).send(`Successfully added ${count} new users`);
	} catch (err) {
		console.log("Error adding multiple users: ", err);
		res.status(400).send("Error adding multiple users");
	}

});

// Find a user by userId, a helper route for developing
router.post("/find", async (req, res) => {

	const id = req.body.id;

	const user = await prisma.users.findUnique({where: {id: id}});

	if (user != null) {
		console.log("found user! here: ", user);
		const resBody = {
			user: user,
			message: "Successfully found user"
		}
		res.status(200).send(resBody);
	} else {
		console.log("Error finding user: ", err);
		res.status(400).send("Error finding user");
	}

});

// Delete all users, a helper route for developing
router.delete("/all", async (req,res) => {
	const count = await prisma.users.count();
	try {
		await prisma.users.deleteMany({});
		res.status(200).send(`All users deleted. Deleted ${count} users`);
	} catch (err){
		console.log("Trouble deleting users: ", err);
		res.status(400).send(`Error deleting all users. Tried deleting ${count} users`);
	}
})

// Logging with user information - Using post so request body is encrypted with user info
// This may be the only way to retrieve user data, as it is most secure. The user should
// only need their id number to retrieve any other data they may need.
router.post("/login", async (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;

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
			data: userData
		});
		res.status(201).send("Sign-up successful! User created.");
	} catch (err) {
		res.status(400).send("Error signing up.");
		throw(err);
	}

});

export default router