<!-- src/components/organisms/RecentlyViewed.svelte -->
<script lang="ts">
    import { recentlyViewedStore } from "../../jet/intents/recentlyViewedIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";

    let recentProducts: Product[] = [];
    let currentCurrency: Currency;

    recentlyViewedStore.subscribe((items) => {
        recentProducts = items;
    });

    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    function handleProductClick(id: string) {
        navigate("product-details", { id });
    }
</script>

{#if recentProducts.length > 0}
    <div class="recently-viewed">
        <h3>Recently Viewed</h3>
        <div class="products-scroll">
            {#each recentProducts as product}
                <div
                    class="recent-item"
                    on:click={() => handleProductClick(product.id)}
                    on:keydown={(e) => handleKey(e, product.id)}
                    role="button"
                    tabindex="0"
                >
                    <img src={product.imageUrl} alt={product.name} />
                    <div class="info">
                        <p class="name">{product.name}</p>
                        <p class="price">
                            {formatPrice(product.price, currentCurrency?.code)}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .recently-viewed {
        margin: 3rem 0;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 12px;
    }

    h3 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.5rem;
    }

    .products-scroll {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding-bottom: 1rem;
        scrollbar-width: thin;
    }

    .products-scroll::-webkit-scrollbar {
        height: 8px;
    }

    .products-scroll::-webkit-scrollbar-track {
        background: #e0e0e0;
        border-radius: 4px;
    }

    .products-scroll::-webkit-scrollbar-thumb {
        background: #007bff;
        border-radius: 4px;
    }

    .recent-item {
        flex: 0 0 200px;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .recent-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .recent-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .info {
        padding: 1rem;
    }

    .name {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .price {
        margin: 0;
        font-weight: bold;
        color: #28a745;
        font-size: 1rem;
    }
</style>
