export function isNullOrUndefinedOrEmpty(obj: any): boolean {
    return obj === null || obj === undefined || obj == '' || (typeof obj === 'object' && Object.keys(obj).length === 0);
}

export function isTimeValidFromNowFor(durationInSecs: number, timeToCheck: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeRemaining = timeToCheck - currentTime;
    return timeRemaining > durationInSecs;
}