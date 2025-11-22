// src/stores/themeStore.ts
import { writable } from 'svelte/store';

export type ThemeMode = 'system' | 'light' | 'dark';

/**
 * Store for the current theme mode. Defaults to system preference.
 */
export const themeStore = writable<ThemeMode>('system');

/**
 * Helper to resolve the effective theme based on user preference and system setting.
 */
export function getEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
    if (mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
}
