// src/stores/currencyStore.ts
import { writable, derived } from 'svelte/store';

export interface Currency {
    code: string;
    symbol: string;
    name: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
];

// Mock exchange rates relative to USD
const MOCK_RATES: Record<string, number> = {
    'USD': 1,
    'EUR': 0.92,
    'SAR': 3.75,
    'JPY': 150.0,
    'GBP': 0.79,
};

const initialCurrency = SUPPORTED_CURRENCIES[0];

function createCurrencyStore() {
    const { subscribe, set } = writable<Currency>(initialCurrency);

    return {
        subscribe,
        setCurrency: (code: string) => {
            const currency = SUPPORTED_CURRENCIES.find(c => c.code === code);
            if (currency) {
                set(currency);
            }
        },
        // In a real app, this would fetch from an API
        fetchRates: async () => {
            // Simulate API call
            await new Promise(r => setTimeout(r, 200));
            return MOCK_RATES;
        }
    };
}

export const currencyStore = createCurrencyStore();

// Derived store to get the current exchange rate
export const currentRate = derived(currencyStore, ($currency: Currency) => {
    return MOCK_RATES[$currency.code] || 1;
});

// Helper to convert and format price
// Base price is always in USD cents (integer)
export function formatPrice(priceInUsdCents: number, currencyCode: string): string {
    const rate = MOCK_RATES[currencyCode] || 1;

    const convertedValue = (priceInUsdCents / 100) * rate;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(convertedValue);
}
