import { db } from "$lib/firebase";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import {employees} from '$lib/stores.svelte.ts';
import {Employee} from "$lib/class/SmallClasses";
import type {WorkerInformation} from "$lib/types";


export async function getWorkers() {
	const collectionRef = collection(db, "workers");
	const snapshot = await getDocs(collectionRef);

	snapshot.forEach(doc => {
		const info = doc.data() as WorkerInformation;
		console.log(doc.id, info);
		const newEmployee: Employee = Employee.new(info.name)
		employees.push(newEmployee);
	})
}
export function addWorker(name: string) {
	setDoc(doc(db, "workers"), {
		name: name
	}).then(() => {
		console.log("workers added");
	})
}