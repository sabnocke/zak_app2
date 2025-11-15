// import {db} from '$lib/firebase.ts';
// import {doc, writeBatch} from "firebase/firestore"
// import {TimeUpdate} from '$lib/TimeUpdate.ts';
//
// import type {
// 	Job,
// 	Employee,
// 	WorkLog,
// 	DailyLog,
// 	DailyLogStore,
// 	DailyEmployeeLog,
// 	WorkTypeLog,
// } from '$lib/types.ts';
// import {deepCopy} from '$lib/utils.ts';
//
//
//
// //TODO convert to class or something similar
// export function updateTimeLogs(userId: string,
// 															 jobs: Job[],
// 															 employees: Employee[],
// 															 activeWork: ActiveWorkMap,
// 															 currentWorkLog: WorkLog,
// 															 currentPauseLog: WorkLog,
// 															 currentDailyLog: DailyLogStore,) {
// 	let needsUpdate = false;
//
// 	Object.values(activeWork).flat().forEach(empId => {
// 		const employee = employees.find(e => e.id === empId);
// 		if (employee && !employee.onPause) needsUpdate = true;
// 	});
//
// 	if (!needsUpdate) return;
//
// 	const updatedWorkLog = deepCopy(currentWorkLog);
// 	const updatedPauseLog = deepCopy(currentPauseLog);
// 	const updatedDailyLog = deepCopy(currentDailyLog);
//
// 	const today = new Date().toISOString().split('T')[0];
// 	const elapsedSeconds = 1;
// 	const elapsedHours = elapsedSeconds / 3600;
//
// 	if (!updatedDailyLog[today]) {
// 		updatedDailyLog[today] = {entry: {}};
// 	}
// 	const todayLog = updatedDailyLog[today].entry;
//
// 	for (const jobId in activeWork) {
// 		const activeEmployeesOnJob = activeWork[jobId];
// 		const jobIndex = jobs.findIndex(job => job.id === jobId);
// 		if (jobIndex === -1) continue;
//
// 		let activeWorkerCount = 0;
//
// 		for (const employeeId of activeEmployeesOnJob) {
// 			const employee = employees.find(e => e.id === employeeId);
// 			if (!employee) continue;
//
// 			if (employee.onPause) {
// 				if (!updatedPauseLog.entry.get(jobId)) updatedPauseLog.entry.set(jobId, new Map()); //?
// 				const oldValue = updatedPauseLog.entry.get(jobId)!.get(employeeId) || 0;
// 				updatedPauseLog.entry.get(jobId)!.set(employeeId, oldValue + elapsedHours);
// 			} else {
// 				activeWorkerCount++;
// 				if (!updatedWorkLog.entry.get(jobId)) updatedWorkLog.entry.set(jobId, new Map());
// 				updatedWorkLog.entry.get(jobId)!.get(employeeId);
// 			}
// 		}
// 	}
// }