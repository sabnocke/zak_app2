import { Timestamp } from 'firebase/firestore';
import { DailyLog } from '$lib/class/DailyLog';
import type { User } from 'firebase/auth';
import { SvelteSet } from 'svelte/reactivity';
import { RefFile } from '$lib/class/SmallClasses.ts';

export interface Document {
	name: string;
	content: string;
	type: string;
}

export interface Job {
	id: string;
	name: string;
	totalValue: number;
	materialCost: number;
	hourlyRate: number;
	totalHours: number;
	remainingHours: number;
	publicDocuments: Document[];
	privateDocuments: Document[];
	archivedAt: Timestamp | null;
}

export interface Employee {
	id: string;
	name: string;
	hourlyWage: number;
	onPause: boolean;
	annualLeaveEntitlement: number;
}

export const DEFAULT_EMPLOYEE: Employee = {
	id: '',
	name: '~~MISSING~~',
	hourlyWage: 0,
	onPause: false,
	annualLeaveEntitlement: 0
};

export interface UserData {
	uid: string;
	email: string | null;
	displayName: string | null;
	lastLogin: Timestamp;
}

export interface WorkLog {
	entry: Map<string, Map<string, number>>;
}

export interface WorkTypeLog {
	entry: Record<string, number>;
}

export interface DailyEmployeeLog {
	work: WorkTypeLog;
	pause: WorkTypeLog;
}

// export interface DailyLog {
//     entry: Record<string, DailyEmployeeLog>
// }

export interface DailyLogStore {
	[date: string]: DailyLog;
}

export interface Leave {
	id: string;
	employeeId: string;
	type: 'vacation' | 'sick';
	startDate: Timestamp;
	endDate: Timestamp;
}

export interface PayrollRecord {
	employeeId: string;
	employeeName: string;
	totalHours: number;
	hourlyWage: number;
	autoBonus: number;
	manualBonus: number;
	totalSalary: number;
	annualLeaveEntitlement: number;
	remainingLeave: number;
}

export interface PayrollPeriod {
	id: string;
	endDate: string; // not sure about this
	totalHours: number;
	totalWages: number;
	records: PayrollRecord[];
}

export interface BarChartProps {
	data: ChartData[];
	title: string;
	barColorClass?: string | null;
	unit: string;
}

export interface ChartData {
	label: string;
	first: number;
	second: number | null;
}

export type StackedUnit = { label: string; work: number; pause: number };
export type UnStackedData = { label: string; value: number }[];
export type StackedData = StackedUnit[];
export type ActiveWorkMap = Record<string, string[]>; // {[jobId]: [employeeId, ...]}
export type FileStore = SvelteSet<RefFile>;

export interface AuthUser extends Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'> {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
}

export interface AuthState {
	isLoading: boolean;
	isAuthenticated: boolean;
	user: AuthUser | User;
}

export const DEFAULT_USER: AuthUser = {
	uid: '',
	email: '',
	displayName: '!__DEFAULT__!',
	photoURL: ''
};

export const DEFAULT_AUTH_STATE: AuthState = {
	isLoading: true,
	isAuthenticated: false,
	user: DEFAULT_USER
};

export interface WorkerInformation {
	name: string;
}
