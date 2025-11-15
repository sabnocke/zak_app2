import type { Job, ActiveWorkMap, DailyLogStore} from '$lib/types.ts';
import {deepCopy} from '$lib/utils.ts';
import {WorkLog} from "$lib/class/WorkLog";
import {Employee} from "$lib/class/SmallClasses";
import {db} from "./firebase";
import {writeBatch, doc, updateDoc, increment} from 'firebase/firestore';

export class TimeUpdate {
	private readonly userId: string;
	private jobs: Job[];
	private employees: Employee[];
	private currentWorkLog: WorkLog;
	private currentPauseLog: WorkLog;
	private currentDailyLog: DailyLogStore;
	private activeWork: ActiveWorkMap;

	private todayString = new Date().toISOString().split('T')[0];
	private needsUpdate = false;
	private readonly elapsedHours = 1/3600;
	private activeWorkerCount = 0;
	private readonly basePath: string;

	constructor(userId: string,
							jobs: Job[],
							employees: Employee[],	//TODO since lookup is important, sets are preferred
							activeWork: ActiveWorkMap,
							currentWorkLog: WorkLog,
							currentPauseLog: WorkLog,
							currentDailyLog: DailyLogStore,) {
		this.userId = userId;
		this.jobs = jobs;
		this.employees = employees;
		this.activeWork = activeWork;
		this.currentWorkLog = deepCopy(currentWorkLog);
		this.currentPauseLog = deepCopy(currentPauseLog);
		this.currentDailyLog = deepCopy(currentDailyLog);

		this.basePath = `users/${this.userId}`;

		Object.values(activeWork).flat().forEach(empId => {
			const employee = employees.find(e => e.id === empId);
			if (employee && !employee.onPause) this.needsUpdate = true;
		});
	}

	public update() {
		if (!this.needsUpdate) return;
		//! here might be an error
		if (!this.currentDailyLog[this.todayString]) {
			this.currentDailyLog[this.todayString].fillEmpty(this.todayString);
		}

		const todayLog = this.currentDailyLog[this.todayString];

		for (const jobId in this.activeWork) {
			const activeEmployeesOnJob = this.activeWork[jobId];
			const jobIndex = this.jobs.findIndex(job => job.id === jobId);
			if (jobIndex === -1) continue;

			for (const employeeId of activeEmployeesOnJob) {
				const employee = this.employees.find(e => e.id === employeeId);
				if (!employee) continue;

				this.updateLogTimes(jobId, employee);

				const logType = employee.type;

				// if (!todayLog.entry[employeeId]) {
				// 	todayLog.entry[employeeId] = {
				// 		work: {entry: {}},
				// 		pause: {entry: {}}
				// 	}
				// }

				const typeLog = todayLog.get(employeeId)!.ref(logType)

				const currentHours = typeLog.entry[jobId] || 0;
				typeLog.entry[jobId] = currentHours + this.elapsedHours;

				//?
				if (!employee.onPause) {
					this.activeWorkerCount++;
				}
				//?
			}
		}
	}

	private updateJobHours(index: number, id: string) {
		if (this.activeWorkerCount === 0) return;

		const hoursToDeduct = this.elapsedHours * this.activeWorkerCount;
		//! Update Firestore using a FieldValue.increment for safety
		//? this is just example (should work locally)
		// const newRemainingHours = this.jobs[index].remainingHours - hoursToDeduct;

		const ref = doc(db, `${this.basePath}/jobs/${id}`)
		updateDoc(ref, {
			remainingHours: increment(-hoursToDeduct),
		}).then(
			() => { console.log(`${id}: success`)},
			(reason) => {console.log(`${id}: error: ${reason}`);}
		);
	}

	private updateLogTimes(jobId: string, employee: Employee) {
		if (employee.onPause) {
			this.currentPauseLog.fillEmpty(jobId);
			const oldValue = this.currentPauseLog.innerGet(jobId, employee.id) || 0;
			this.currentPauseLog.innerSet(jobId, employee.id, oldValue + this.elapsedHours);
		} else {
			this.activeWorkerCount++;
			this.currentWorkLog.fillEmpty(jobId);
			const oldValue = this.currentWorkLog.innerGet(jobId, employee.id) || 0;
			this.currentWorkLog.innerSet(jobId, employee.id, oldValue + this.elapsedHours);
		}
	}

	private async commitLogUpdates() {
		const batch = writeBatch(db);

		batch.set(doc(db, `${this.basePath}/state/workLog`), {data: this.currentWorkLog});
		batch.set(doc(db, `${this.basePath}/state/pauseLog`), {data: this.currentPauseLog});
		batch.set(doc(db, `${this.basePath}/state/detailedWorkLog`), {data: this.currentDailyLog});

		await batch.commit();
	}

	private static fillEmpty(log: WorkLog, key: string) {
		if (!log.entry.get(key))
			log.entry.set(key, new Map());

		return log;
	}
}