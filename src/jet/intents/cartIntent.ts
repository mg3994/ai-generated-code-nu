// src/jet/intents/cartIntent.ts
import type { Product } from "../models/product";
import { writable } from "svelte/store";

/**
 * Simple in‑memory cart store.
 * In a real app this would sync with backend / localStorage.
 */
export const cartStore = writable<Product[]>([]);

export function addToCart(product: Product): void {
    cartStore.update((items: Product[]) => [...items, product]);
}

export function removeFromCart(productId: string): void {
    cartStore.update((items: Product[]) => items.filter((p: Product) => p.id !== productId));
}

export function clearCart(): void {
    cartStore.set([]);
}
