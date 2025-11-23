// src/stores/routeStore.ts
import { writable } from 'svelte/store';

export type RouteName = 'home' | 'product-details' | 'cart';

export interface Route {
    name: RouteName;
    params?: Record<string, any>;
}

export const routeStore = writable<Route>({ name: 'home' });

export function navigate(name: RouteName, params?: Record<string, any>) {
    routeStore.set({ name, params });
    window.scrollTo(0, 0);
}
