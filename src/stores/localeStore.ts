// src/stores/localeStore.ts
import { writable, derived } from 'svelte/store';

export interface LocaleInfo {
    code: string;
    name: string;
    dir: 'ltr' | 'rtl';
    flag: string;
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [
    { code: 'en-US', name: 'English (US)', dir: 'ltr', flag: '🇺🇸' },
    { code: 'ar-SA', name: 'Arabic (SA)', dir: 'rtl', flag: '🇸🇦' },
    { code: 'fr-FR', name: 'French', dir: 'ltr', flag: '🇫🇷' },
    { code: 'es-ES', name: 'Spanish', dir: 'ltr', flag: '🇪🇸' },
    { code: 'de-DE', name: 'German', dir: 'ltr', flag: '🇩🇪' },
    { code: 'ja-JP', name: 'Japanese', dir: 'ltr', flag: '🇯🇵' },
];

const initialLocale = SUPPORTED_LOCALES[0];

function createLocaleStore() {
    const { subscribe, set } = writable<LocaleInfo>(initialLocale);

    return {
        subscribe,
        setLocale: (code: string) => {
            const locale = SUPPORTED_LOCALES.find(l => l.code === code);
            if (locale) {
                set(locale);
                document.documentElement.dir = locale.dir;
                document.documentElement.lang = locale.code;
            }
        }
    };
}

export const localeStore = createLocaleStore();
export const isRtl = derived(localeStore, ($locale: LocaleInfo) => $locale.dir === 'rtl');
