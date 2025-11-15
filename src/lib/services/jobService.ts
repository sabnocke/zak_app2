import {db} from "$lib/firebase";
import {collection, addDoc} from "firebase/firestore"
import type {Job} from '$lib/types.ts';

interface JobInput {
	jobName: string;
	jobValue: string;
	materialCost: string;
	hourlyRate: string;	//? does it have to be string
}

/**
 * Creates a new job document in Firestore.
 * @param input - Data from the JobForm.
 * @param userId - The current user's UID.
 */
export function createJob(input: JobInput, userId: string): void {
	const valueNum = parseFloat(input.jobValue);
	const rateNum = parseFloat(input.hourlyRate);
	const materialNum = parseFloat(input.materialCost) || 0;

	const laborValue = valueNum - materialNum;
	const totalHours = laborValue / rateNum;

	const newJob: Omit<Job, "id"> = {
		name: input.jobName.trim(),
		totalValue: valueNum,
		materialCost: materialNum,
		hourlyRate: rateNum,
		totalHours: totalHours,
		remainingHours: totalHours,
		publicDocuments: [],
		privateDocuments: [],
		archivedAt: null
	}

	addDoc(collection(db, `users/${userId}/jobs`), newJob)
		.then(doc => console.log(`Created job: ${doc.id}`))
		.catch(err => console.log(`Error creating job: ${err}`));
	//TODO maybe really throw some error
}

//? I don't need to delete anything at the time
// function deleteJob(jobName: string, userId: string) {}