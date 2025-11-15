import {DailyEmployeeLog} from '$lib/class/SmallClasses';

interface IDailyLog {
	entry: Record<string, DailyEmployeeLog>
}

export class DailyLog implements IDailyLog {
	public entry: Record<string, DailyEmployeeLog>;

	constructor() {
		this.entry = {};
	}

	public get(key: string, defaultValue: DailyEmployeeLog | null = null): DailyEmployeeLog | null {
		return this.entry[key] || defaultValue;
	}

	public fillEmpty(key: string) {
		if (!this.entry[key]) {
			this.entry[key] = new DailyEmployeeLog();
		}
		return this;
	}
}