<!-- src/components/organisms/ProductRecommendations.svelte -->
<script lang="ts">
    import { getRecommendations } from "../../jet/intents/recommendationIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { toastStore } from "../../stores/toastStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";

    export let currentProduct: Product;
    export let allProducts: Product[];

    let currentCurrency: Currency;

    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    $: recommendations = getRecommendations(currentProduct, allProducts, 4);

    function handleProductClick(id: string) {
        navigate("product-details", { id });
    }

    function handleAddToCart(e: Event, product: Product) {
        e.stopPropagation();
        addToCart(product);
        toastStore.show(`Added ${product.name} to cart!`, "success");
    }
</script>

{#if recommendations.length > 0}
    <div class="recommendations">
        <h3>You May Also Like</h3>
        <div class="products-grid">
            {#each recommendations as product}
                <div
                    class="product-card"
                    on:click={() => handleProductClick(product.id)}
                    role="button"
                    tabindex="0"
                    on:keydown={(e) =>
                        e.key === "Enter" && handleProductClick(product.id)}
                >
                    <img src={product.imageUrl} alt={product.name} />
                    <div class="info">
                        <h4>{product.name}</h4>
                        {#if product.category}
                            <p class="category">{product.category}</p>
                        {/if}
                        <p class="price">
                            {formatPrice(product.price, currentCurrency?.code)}
                        </p>
                        <button
                            class="add-btn"
                            on:click={(e) => handleAddToCart(e, product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .recommendations {
        margin: 3rem 0;
        padding: 2rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 12px;
    }

    h3 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.5rem;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1.5rem;
    }

    .product-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .product-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .info {
        padding: 1rem;
    }

    h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
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

    .price {
        font-weight: bold;
        color: #28a745;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }

    .add-btn {
        width: 100%;
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
    }

    .add-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
</style>
