<!-- src/components/pages/Wishlist.svelte -->
<script lang="ts">
    import {
        wishlistStore,
        removeFromWishlist,
    } from "../../jet/intents/wishlistIntent";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";
    import { toastStore } from "../../stores/toastStore";

    let wishlistItems: Product[] = [];
    let currentCurrency: Currency;

    wishlistStore.subscribe((items) => {
        wishlistItems = items;
    });

    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    function handleRemove(id: string, name: string) {
        removeFromWishlist(id);
        toastStore.show(`Removed ${name} from wishlist`, "info");
    }

    function handleAddToCart(product: Product) {
        addToCart(product);
        toastStore.show(`Added ${product.name} to cart!`, "success");
    }

    function handleViewProduct(id: string) {
        navigate("product-details", { id });
    }
</script>

<div class="wishlist-page">
    <button class="back-btn" on:click={() => navigate("home")}
        >&larr; Back to Shopping</button
    >
    <h1>My Wishlist</h1>

    {#if wishlistItems.length === 0}
        <div class="empty-wishlist">
            <div class="empty-icon">💝</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later!</p>
            <button class="shop-btn" on:click={() => navigate("home")}
                >Start Shopping</button
            >
        </div>
    {:else}
        <div class="wishlist-count">
            {wishlistItems.length}
            {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
        </div>
        <div class="wishlist-grid">
            {#each wishlistItems as item}
                <div class="wishlist-item">
                    <button
                        class="remove-btn"
                        on:click={() => handleRemove(item.id, item.name)}
                        aria-label="Remove from wishlist"
                    >
                        ×
                    </button>
                    <div
                        class="item-image"
                        on:click={() => handleViewProduct(item.id)}
                        role="button"
                        tabindex="0"
                    >
                        {#if item.imageUrl}
                            <img src={item.imageUrl} alt={item.name} />
                        {/if}
                    </div>
                    <div class="item-details">
                        <h3
                            on:click={() => handleViewProduct(item.id)}
                            role="button"
                            tabindex="0"
                        >
                            {item.name}
                        </h3>
                        {#if item.category}
                            <p class="category">{item.category}</p>
                        {/if}
                        <p class="price">
                            {formatPrice(item.price, currentCurrency?.code)}
                        </p>
                        <button
                            class="add-cart-btn"
                            on:click={() => handleAddToCart(item)}
                        >
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .wishlist-page {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .back-btn {
        background: none;
        border: none;
        color: #007bff;
        text-decoration: none;
        cursor: pointer;
        margin-bottom: 1rem;
        font-size: 1rem;
        padding: 0;
        transition: color 0.2s;
    }

    .back-btn:hover {
        color: #0056b3;
        text-decoration: underline;
    }

    h1 {
        margin-bottom: 2rem;
        color: #333;
    }

    .empty-wishlist {
        text-align: center;
        margin-top: 3rem;
        padding: 3rem;
        background-color: #f8f9fa;
        border-radius: 12px;
    }

    .empty-icon {
        font-size: 5rem;
        margin-bottom: 1rem;
    }

    .empty-wishlist h2 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    .empty-wishlist p {
        color: #666;
        margin-bottom: 2rem;
    }

    .shop-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        font-size: 1.1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .shop-btn:hover {
        background-color: #0056b3;
    }

    .wishlist-count {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }

    .wishlist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }

    .wishlist-item {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .wishlist-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .remove-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1;
        transition: all 0.2s;
        color: #dc3545;
    }

    .remove-btn:hover {
        transform: scale(1.1);
        background: #dc3545;
        color: white;
    }

    .item-image {
        height: 250px;
        background: #f8f9fa;
        cursor: pointer;
    }

    .item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item-details {
        padding: 1.5rem;
    }

    h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
        cursor: pointer;
        transition: color 0.2s;
    }

    h3:hover {
        color: #007bff;
    }

    .category {
        color: #666;
        font-size: 0.85rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #28a745;
        margin: 1rem 0;
    }

    .add-cart-btn {
        width: 100%;
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s;
    }

    .add-cart-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
</style>
