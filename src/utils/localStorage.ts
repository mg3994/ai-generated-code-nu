// src/utils/localStorage.ts
/**
 * Safe localStorage wrapper with error handling
 */

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return defaultValue;
    }
}

export function setToLocalStorage<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error);
        return false;
    }
}

export function removeFromLocalStorage(key: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
        window.localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage key "${key}":`, error);
        return false;
    }
}
