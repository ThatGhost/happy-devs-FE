
export function areDatesEqual(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export function getDateString(date: Date): string {
    return `${date.getDate() > 10 ? date.getDate() : "0" + date.getDate()}/${date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth()}`;
}