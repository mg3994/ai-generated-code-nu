// src/jet/models/review.ts
/**
 * Branded type for ReviewId to ensure type safety.
 */
export type ReviewId = string & { readonly brand: unique symbol };

/**
 * Review domain entity.
 */
export interface Review {
    id: ReviewId;
    productId: string;
    author: string;
    rating: number; // 1-5
    comment: string;
    date: string;
    verified: boolean;
}

/**
 * Helper to create a branded ReviewId.
 */
export const makeReviewId = (raw: string): ReviewId => raw as ReviewId;

/**
 * Generate mock reviews for a product
 */
export function generateMockReviews(productId: string, count: number = 3): Review[] {
    const authors = ['John D.', 'Sarah M.', 'Mike R.', 'Emily K.', 'David L.', 'Lisa P.'];
    const comments = [
        'Great product! Exactly as described.',
        'Very satisfied with this purchase.',
        'Good quality, fast shipping.',
        'Excellent value for money.',
        'Highly recommend this product!',
        'Perfect! Will buy again.',
    ];

    return Array.from({ length: count }, (_, i) => ({
        id: makeReviewId(`review-${productId}-${i}`),
        productId,
        author: authors[Math.floor(Math.random() * authors.length)],
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: comments[Math.floor(Math.random() * comments.length)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        verified: Math.random() > 0.3,
    }));
}
