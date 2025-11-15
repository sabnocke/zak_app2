import type { WorkTypeLog } from '$lib/types.ts';
import {Unreachable} from '$lib/utils.ts';

interface IEmployee {
	id: string;
	name: string;
	hourlyWage: number;
	onPause: boolean;
	annualLeaveEntitlement: number;
}

interface IDailyEmployeeLog {
	work: WorkTypeLog;
	pause: WorkTypeLog;
}

export class Employee implements IEmployee {
	id: string;
	name: string;
	hourlyWage: number;
	annualLeaveEntitlement: number;
	onPause: boolean;

	constructor(id: string, name: string, hourlyWage: number, annualLeaveEntitlement: number) {
		this.id = id;
		this.name = name;
		this.hourlyWage = hourlyWage;
		this.annualLeaveEntitlement = annualLeaveEntitlement;
		this.onPause = false;
	}

	public get type(): "pause" | "work" {
		return this.onPause ? "pause" : "work";
	}
}

export class DailyEmployeeLog implements IDailyEmployeeLog {
	work: WorkTypeLog;
	pause: WorkTypeLog;

	constructor(work: WorkTypeLog | null = null, pause: WorkTypeLog | null = null) {
		this.work = work ?? {entry: {}};
		this.pause = pause ?? {entry: {}};
	}

	public ref(name: "pause" | "work") : WorkTypeLog {
		if (name === "work") return this.work;
		if (name === "pause") return this.pause;
		throw new Unreachable();
	}
}