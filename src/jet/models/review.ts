// src/jet/models/review.ts
/**
 * Branded type for ReviewId.
 */
export type ReviewId = string & { readonly brand: unique symbol };

/**
 * Review entity for a product.
 */
export interface Review {
    id: ReviewId;
    productId: string; // reference to ProductId (branded) – keep as string for simplicity
    rating: number; // 1-5
    comment?: string;
    author: string;
    date: string; // ISO date string
}

/**
 * Helper to create a branded ReviewId.
 */
export const makeReviewId = (raw: string): ReviewId => raw as ReviewId;
