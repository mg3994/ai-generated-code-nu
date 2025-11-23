// src/jet/dependencies/bag.ts
/**
 * Simple configuration bag used for DI.
 * In a real app this could load from env, remote config, etc.
 */
export interface ConfigBag {
    apiBase: string;
    defaultLocale: string;
    themeMode: 'system' | 'light' | 'dark';
}

export const defaultConfig: ConfigBag = {
    apiBase: import.meta.env.VITE_API_BASE ?? 'https://fakestoreapi.com',
    defaultLocale: 'en-US',
    themeMode: 'system',
};
