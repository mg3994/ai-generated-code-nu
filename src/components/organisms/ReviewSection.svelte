<!-- src/components/organisms/ReviewSection.svelte -->
<script lang="ts">
    import type { Review } from "../../jet/models/review";
    import { generateMockReviews } from "../../jet/models/review";
    import ReviewCard from "../molecules/ReviewCard.svelte";

    export let productId: string;

    let reviews: Review[] = generateMockReviews(productId, 5);
    let showAll = false;

    $: displayedReviews = showAll ? reviews : reviews.slice(0, 3);
    $: averageRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    $: ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
        percentage:
            (reviews.filter((r) => r.rating === star).length / reviews.length) *
            100,
    }));

    function getStars(rating: number): string {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        return (
            "★".repeat(fullStars) +
            (hasHalf ? "½" : "") +
            "☆".repeat(5 - fullStars - (hasHalf ? 1 : 0))
        );
    }
</script>

<div class="review-section">
    <h2>Customer Reviews</h2>

    <div class="review-summary">
        <div class="average-rating">
            <div class="rating-number">{averageRating.toFixed(1)}</div>
            <div class="stars">{getStars(averageRating)}</div>
            <div class="review-count">{reviews.length} reviews</div>
        </div>

        <div class="rating-bars">
            {#each ratingDistribution as { star, count, percentage }}
                <div class="rating-bar">
                    <span class="star-label">{star} ★</span>
                    <div class="bar-container">
                        <div
                            class="bar-fill"
                            style="width: {percentage}%"
                        ></div>
                    </div>
                    <span class="count">{count}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="reviews-list">
        {#each displayedReviews as review (review.id)}
            <ReviewCard {review} />
        {/each}
    </div>

    {#if reviews.length > 3}
        <button class="show-more-btn" on:click={() => (showAll = !showAll)}>
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
        </button>
    {/if}
</div>

<style>
    .review-section {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 2px solid #eee;
    }

    h2 {
        margin-bottom: 1.5rem;
        color: #333;
    }

    .review-summary {
        display: flex;
        gap: 3rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .average-rating {
        text-align: center;
        min-width: 150px;
    }

    .rating-number {
        font-size: 3rem;
        font-weight: bold;
        color: #333;
    }

    .stars {
        color: #ffc107;
        font-size: 1.5rem;
        letter-spacing: 3px;
        margin: 0.5rem 0;
    }

    .review-count {
        color: #666;
        font-size: 0.9rem;
    }

    .rating-bars {
        flex: 1;
        min-width: 250px;
    }

    .rating-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
    }

    .star-label {
        width: 40px;
        color: #666;
        font-size: 0.9rem;
    }

    .bar-container {
        flex: 1;
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
    }

    .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #ffc107, #ff9800);
        transition: width 0.3s ease;
    }

    .count {
        width: 30px;
        text-align: right;
        color: #666;
        font-size: 0.85rem;
    }

    .reviews-list {
        margin-top: 2rem;
    }

    .show-more-btn {
        display: block;
        margin: 2rem auto 0;
        padding: 0.75rem 2rem;
        background: white;
        border: 2px solid #007bff;
        color: #007bff;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s;
    }

    .show-more-btn:hover {
        background: #007bff;
        color: white;
    }
</style>
