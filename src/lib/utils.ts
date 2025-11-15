export function formatValue(value: number, unit: string = 'h'): string {
    return unit.toLowerCase() === "kč" ?
        `${value.toLocaleString("cs-CZ", {maximumFractionDigits: 0})} Kč` :
        `${value.toFixed(1)} h`;
}

export function czechPublicHolidays(year: number): string[] {
    //TODO do this differently
    const holidays = [
        `01-01`, `05-01`, `05-08`, `07-05`, `07-06`, `09-28`, `10-28`, `11-17`, `12-24`, `12-25`, `12-26`
    ];

    const easter = (y: number) => {
        const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(y, month - 1, day);
    }

    const easterDate = easter(year);

    const goodFriday = new Date(easterDate);
    goodFriday.setDate(easterDate.getDate() - 2);

    const easterMonday = new Date(easterDate);
    easterMonday.setDate(easterDate.getDate() + 1);

    holidays.push(`${String(goodFriday.getMonth() + 1).padStart(2, '0')}-${String(goodFriday.getDate()).padStart(2, '0')}`);
    holidays.push(`${String(easterMonday.getMonth() + 1).padStart(2, '0')}-${String(easterMonday.getDate()).padStart(2, '0')}`);
    return holidays.map(h => `${year}-${h}`);
}

export function calculateWorkingDays(startDate: string, endDate: string): number {
    let count = 0;
    const cur = new Date(startDate);
    const last = new Date(endDate);

    while(cur <= last) {
        const year = cur.getFullYear();
        const holidays = czechPublicHolidays(year);
        const dayOfWeek = cur.getDay();
        const dateStr = cur.toISOString().split('T')[0];

        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidays.includes(dateStr))
            count++;

        
        cur.setDate(cur.getDate() + 1);
    }

    return count;
}

export function deepCopy<T>(object: T): T {
	return JSON.parse(JSON.stringify(object)) as T;
}

export class Unreachable extends Error {}