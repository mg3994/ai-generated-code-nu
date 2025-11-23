// src/jet/intents/recommendationIntent.ts
import type { Product } from '../models/product';

/**
 * Simple recommendation algorithm:
 * - Prefer same category
 * - Then closest price within ±20%
 * - Return up to `limit` items excluding the current product
 */
export function getRecommendations(current: Product, all: Product[], limit: number = 4): Product[] {
    const others = all.filter(p => p.id !== current.id);
    const sameCategory = others.filter(p => p.category && p.category === current.category);
    const sorted = sameCategory.sort((a, b) => {
        const diffA = Math.abs(a.price - current.price);
        const diffB = Math.abs(b.price - current.price);
        return diffA - diffB;
    });
    if (sorted.length < limit) {
        const remaining = others
            .filter(p => !sorted.includes(p))
            .sort((a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price));
        return [...sorted, ...remaining].slice(0, limit);
    }
    return sorted.slice(0, limit);
}
