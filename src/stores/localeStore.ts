// src/stores/localeStore.ts
import { writable } from 'svelte/store';

export type Locale = string; // e.g., 'en-US', 'ar-SA'

/**
 * Store for the current locale. Defaults to the config bag's defaultLocale.
 */
export const localeStore = writable<Locale>('en-US');
