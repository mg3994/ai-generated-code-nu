<!-- src/components/molecules/ProductCard.svelte -->
<script lang="ts">
    import type { Product } from "../../jet/models/product";
    import { addToCart } from "../../jet/intents/cartIntent";
    import {
        toggleWishlist,
        wishlistStore,
    } from "../../jet/intents/wishlistIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Currency } from "../../stores/currencyStore";
    import { toastStore } from "../../stores/toastStore";
    import QuickViewModal from "./QuickViewModal.svelte";

    export let product: Product;

    let currentCurrency: Currency;
    let wishlistItems: Product[] = [];
    let showQuickView = false;

    currencyStore.subscribe((value: Currency) => {
        currentCurrency = value;
    });

    wishlistStore.subscribe((items: Product[]) => {
        wishlistItems = items;
    });

    $: isInWishlist = wishlistItems.some((p) => p.id === product.id);

    function handleAddToCart(e: Event) {
        e.stopPropagation();
        addToCart(product);
        toastStore.show(`Added ${product.name} to cart!`, "success");
    }

    function handleToggleWishlist(e: Event) {
        e.stopPropagation();
        const added = toggleWishlist(product);
        toastStore.show(
            added ? `Added to wishlist!` : `Removed from wishlist`,
            added ? "success" : "info",
        );
    }

    function handleQuickView(e: Event) {
        e.stopPropagation();
        showQuickView = true;
    }

    function handleCardClick() {
        navigate("product-details", { id: product.id });
    }
</script>

<div
    class="card"
    on:click={handleCardClick}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === "Enter" && handleCardClick()}
>
    <div class="image-container">
        {#if product.imageUrl}
            <img src={product.imageUrl} alt={product.name} />
        {/if}
        <button
            class="wishlist-btn {isInWishlist ? 'active' : ''}"
            on:click={handleToggleWishlist}
            aria-label="Add to wishlist"
        >
            {isInWishlist ? "❤️" : "🤍"}
        </button>
        <button class="quick-view-btn" on:click={handleQuickView}>
            👁️ Quick View
        </button>
    </div>

    <div class="content">
        <h3>{product.name}</h3>
        {#if product.category}
            <p class="category">{product.category}</p>
        {/if}
        <p class="description">{product.description}</p>
        <div class="footer">
            <span class="price"
                >{formatPrice(product.price, currentCurrency?.code)}</span
            >
            <button class="add-btn" on:click={handleAddToCart}
                >Add to Cart</button
            >
        </div>
    </div>
</div>

{#if showQuickView}
    <QuickViewModal {product} onClose={() => (showQuickView = false)} />
{/if}

<style>
    .card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .image-container {
        position: relative;
        height: 250px;
        overflow: hidden;
        background: #f8f9fa;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }

    .card:hover .image-container img {
        transform: scale(1.05);
    }

    .wishlist-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
        z-index: 2;
    }

    .wishlist-btn:hover {
        transform: scale(1.1);
    }

    .wishlist-btn.active {
        animation: heartBeat 0.3s ease;
    }

    @keyframes heartBeat {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    .quick-view-btn {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s;
        opacity: 0;
    }

    .card:hover .quick-view-btn {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }

    .quick-view-btn:hover {
        background: rgba(0, 0, 0, 0.9);
    }

    .content {
        padding: 1.5rem;
    }

    h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 2;
    }

    .category {
        color: #666;
        font-size: 0.85rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
    }

    .description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 2;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: #28a745;
    }

    .add-btn {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .add-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
</style>
