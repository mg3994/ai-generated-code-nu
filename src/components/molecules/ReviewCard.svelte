<!-- src/components/molecules/ReviewCard.svelte -->
<script lang="ts">
    import type { Review } from "../../jet/models/review";

    export let review: Review;

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    function getStars(rating: number): string {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }
</script>

<div class="review-card">
    <div class="review-header">
        <div class="author-info">
            <div class="avatar">{review.author.charAt(0)}</div>
            <div>
                <div class="author-name">
                    {review.author}
                    {#if review.verified}
                        <span class="verified" title="Verified Purchase">✓</span
                        >
                    {/if}
                </div>
                <div class="review-date">{formatDate(review.date)}</div>
            </div>
        </div>
        <div class="rating" title="{review.rating} out of 5 stars">
            {getStars(review.rating)}
        </div>
    </div>
    <p class="comment">{review.comment}</p>
</div>

<style>
    .review-card {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .review-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .author-info {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .author-name {
        font-weight: 600;
        color: #333;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .verified {
        background: #28a745;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
    }

    .review-date {
        font-size: 0.85rem;
        color: #666;
    }

    .rating {
        color: #ffc107;
        font-size: 1.2rem;
        letter-spacing: 2px;
    }

    .comment {
        color: #555;
        line-height: 1.6;
        margin: 0;
    }
</style>
