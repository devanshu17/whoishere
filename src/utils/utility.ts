export function isNullOrUndefinedOrEmpty(obj: any): boolean {
    return obj === null || obj === undefined || obj == '' || (typeof obj === 'object' && Object.keys(obj).length === 0);
}