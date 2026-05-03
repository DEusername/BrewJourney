import { Router } from 'express'
import prisma from '../lib/prisma.js';

const router = Router()

router.post("/add", async (req, res) => {

	const userId = req.body.id; // Will be used to add grinder to user's data in the database
	const grinderFields = req.body.grinderFields;

	console.log(grinderFields)

	// Assumes req.body.grinderFields is in the correct format
	/*
	grinderFields: {
		grinderName String
  		minSettingFine Int
  		maxSettingCoarse Int
	}
	*/

	try {
		const grinder = await prisma.grinders.create({
			data : grinderFields
		});

		console.log("new grinder created: ", grinder);

		// If the grinder is added to the table, add to the user's record
		const updateUser = await prisma.users.update({
			where: { id: userId },
			data: { grinderId: grinder.id },
		});
		res.status(200).send("Grinder successfully added!");
	} catch (err) {
		console.log("Error adding grinder: ", err);
		res.status(400).send("Error adding grinder");
	}
});

router.get("/all", async (req, res) => {

	const count = await prisma.grinders.count();
	if (count == 0){
		res.status(404).send("No grinders in the database")
	} else {
		const grinders = await prisma.grinders.findMany();
		res.status(200).send(grinders);
	}
})

// Get a grinder by it's id, probably won't use if each user only has one grinder and it's stored under the grinder FK
router.post("/find", async (req, res) => {
	
	const id = req.body.id;

	try {
		const grinder = await prisma.grinders.findUnique({
			where : {id: id}
		});
		console.log("Found grinder! Here: ", grinder);
		res.status(200).send(`Found grinder! Here: ${grinder}`);
	} catch (err) {
		console.log("Error finding grinder: ", err);
		res.status(404).send("Couldn't find grinder");
	}

});

// Get a grinder by a user's id
router.post("/findgrinder", async (req, res) => {
	
	const id = req.body.id;

	try {
		const user = await prisma.users.findUnique({
			where : {id: id}
		});
		console.log("Found user! Here: ", user);
		const grinder = await prisma.grinders.findUnique({where : {id: user.grinderId}});
		res.status(200).send(grinder);
	} catch (err) {
		console.log("Error finding grinder: ", err);
		res.status(404).send("Couldn't find grinder");
	}

});

export default router