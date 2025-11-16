import type { DailyLogStore, Job, Leave, PayrollPeriod, AuthState} from '$lib/types.ts';
import {DEFAULT_AUTH_STATE} from '$lib/types.ts';
import {Employee} from "$lib/class/SmallClasses"
import {WorkLog} from "$lib/class/WorkLog"

// import {derived} from 'svelte/store';
// import {doc, getDoc, onSnapshot} from "firebase/firestore";

//TODO might switch it to runes

export const authState: AuthState = $state<AuthState>(DEFAULT_AUTH_STATE);
// export const user = $derived(state.user);


export const jobs = $state<Job[]>([]);
export const archivedJobs = $state<Job[]>([]);
export const employees = $state<Employee[]>([]);
export const activeWork = $state<Record<string, string[]>>({});
export const workLog = $state(new WorkLog());
export const pauseLog = $state(new WorkLog());
export const dailyLog = $state<DailyLogStore>({});
export const leaveRecords = $state<Leave[]>([]);
export const payrollHistory = $state<PayrollPeriod[]>([]);




//? this is just really weird
// export const totalWorkingHours = derived([workLog], ([$worklog]) => {
// 	if (!$worklog) {
// 		return;
// 	}
//
// 	let total = 0;
// 	Object.values($worklog).forEach((workLog) => {
// 		Object.values(workLog).forEach(hours => {
// 			total += hours as number;
// 		});
// 	});
//
// 	return total;
// });