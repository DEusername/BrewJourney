import { Router } from 'express'
import prisma from '../lib/prisma.js';

const router = Router()

// Get all brew logs for a user, most helpful for displaying on logs page to user
// Maybe add a 'select fields' since when displaying all logs, you may only
// need certain fields, and can retrieve the rest of the data after interacting
// with one (tapping one) in your log
router.post("/all", async (req, res) => {
	const userId = req.body.id;
	const count = await prisma.brewLogs.count();
	if (count == 0){
		res.status(404).send("No brew logs in the database")
	} else {
		const logs = await prisma.brewLogs.findMany({where: {id: userId}, orderBy: {createdOn: "desc"}});
		res.status(200).send(logs);
	}
});

// Find a specific brewlog by a brewlog's id
router.get("/find/:id", async (req, res) => {
	const id = req.params.id;

	const log = await prisma.brewLogs.findUnique({where: {id: id}});
	console.log("returned ", user, " after searching for matching log with id");

	if (log != null){
		res.status(200).send("Found log!");
	} else {
		res.status(404).send("Log not found.");
	}
});

// Create a brewlog using user-provided data, including userId and other foreign keys for the database's record
router.post("/create", async (req, res) => {
	const body = req.body; // Assuming that it is formatted properly
	/*
	{
		userId:
		grinderId:
		brewMethodId:
		coffeeName:
		roastLevel:
		targetRation:
		doseGrams:
		targetWaterGrams:
		actualWaterGrams:
		grindSize:
		brewTimeSeconds:
		waterTemp:
		resultRating:
		notes:
	}

	Optional/default/auto values for 'createdOn' and '(brewlog)id'
	*/
});

export default router