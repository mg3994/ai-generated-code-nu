// src/context/diContext.ts
import { setContext, getContext } from 'svelte';

/**
 * Keys for dependency injection.
 */
export const DI_KEYS = {
    CONFIG: Symbol('CONFIG'),
    API_CLIENT: Symbol('API_CLIENT'),
};

/**
 * Helper to set a dependency in the context.
 */
export function provideDependency<T>(key: symbol, value: T): void {
    setContext(key, value);
}

/**
 * Helper to get a dependency from the context.
 */
export function injectDependency<T>(key: symbol): T {
    return getContext<T>(key);
}
