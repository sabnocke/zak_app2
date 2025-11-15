interface IWorkLog {
	entry: Map<string, Map<string, number>>;
}

export class WorkLog implements IWorkLog {
	public entry: Map<string, Map<string, number>>;
	constructor() {
		this.entry = new Map<string, Map<string, number>>();
	}

	public innerSet(keyAlpha: string, keyBeta: string, value: number) {
		if (!this.entry.has(keyAlpha)) {
			this.fillEmpty(keyAlpha);
		}
		this.entry.get(keyAlpha)!.set(keyBeta, value);
	}

	public innerGet(keyAlpha: string, keyBeta: string) : number | null {
		const first = this.entry.get(keyAlpha);
		if (!first) {
			return null;
		}
		const second = first.get(keyBeta);
		if (!second) {
			return null;
		}
		return second;
	}

	public fillEmpty(key: string) {
		if (!this.entry.has(key)) {
			this.entry.set(key, new Map<string, number>());
		}
	}
}

