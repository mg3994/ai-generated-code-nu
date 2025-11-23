// src/jet/intents/cartIntent.ts
import type { Product } from "../models/product";
import { writable } from "svelte/store";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage";

const CART_STORAGE_KEY = 'linkwithmentor_cart';

/**
 * Simple in‑memory cart store with localStorage persistence.
 */
const initialCart = getFromLocalStorage<Product[]>(CART_STORAGE_KEY, []);
export const cartStore = writable<Product[]>(initialCart);

// Subscribe to cart changes and persist to localStorage
cartStore.subscribe((items: Product[]) => {
    setToLocalStorage(CART_STORAGE_KEY, items);
});

export function addToCart(product: Product): void {
    cartStore.update((items: Product[]) => [...items, product]);
}

export function removeFromCart(productId: string): void {
    cartStore.update((items: Product[]) => items.filter((p: Product) => p.id !== productId));
}

export function clearCart(): void {
    cartStore.set([]);
}
