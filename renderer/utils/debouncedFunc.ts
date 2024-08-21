type DebouncedFunction = (...args: any[]) => void;


export function debounce<T extends DebouncedFunction>(
    func: T,
    wait: number
): T {
    let timeout: NodeJS.Timeout | null = null;

    const debouncedFunc = function (this: any, ...args: any[]) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };

    return debouncedFunc as T;
}