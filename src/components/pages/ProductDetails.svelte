<!-- src/components/pages/ProductDetails.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import { getProductById } from "../../jet/intents/productIntent";
    import { addToRecentlyViewed } from "../../jet/intents/recentlyViewedIntent";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";
    import LoadingSpinner from "../atoms/LoadingSpinner.svelte";
    import ErrorMessage from "../atoms/ErrorMessage.svelte";
    import ImageLightbox from "../molecules/ImageLightbox.svelte";
    import ReviewSection from "../organisms/ReviewSection.svelte";
    import RecentlyViewed from "../organisms/RecentlyViewed.svelte";
    import { toastStore } from "../../stores/toastStore";

    export let productId: string;

    let product: Product | null = null;
    let loading = true;
    let error: string | null = null;
    let currentCurrency: Currency;
    let showLightbox = false;

    currencyStore.subscribe((value: Currency) => {
        currentCurrency = value;
    });

    async function loadProduct() {
        loading = true;
        error = null;
        try {
            product = await getProductById(productId);
            if (!product) {
                error = "Product not found";
            } else {
                // Track recently viewed
                addToRecentlyViewed(product);
            }
        } catch (err) {
            error =
                err instanceof Error
                    ? err.message
                    : "Failed to load product details";
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadProduct();
    });

    function handleAddToCart() {
        if (product) {
            addToCart(product);
            toastStore.show(`Added ${product.name} to cart!`, "success");
        }
    }

    function openLightbox() {
        showLightbox = true;
    }

    function closeLightbox() {
        showLightbox = false;
    }
</script>

<div class="details">
    <button class="back" on:click={() => navigate("home")}
        >&larr; Back to Home</button
    >

    {#if loading}
        <LoadingSpinner message="Loading product details..." />
    {:else if error}
        <ErrorMessage message={error} onRetry={loadProduct} />
    {:else if product}
        <div class="product-container">
            <div class="image-wrapper">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    on:click={openLightbox}
                    role="button"
                    tabindex="0"
                    on:keydown={(e) => e.key === "Enter" && openLightbox()}
                />
                <div class="zoom-hint">🔍 Click to zoom</div>
            </div>
            <div class="info">
                <h1>{product.name}</h1>
                {#if product.category}
                    <p class="category">Category: {product.category}</p>
                {/if}
                <p class="price">
                    {formatPrice(product.price, currentCurrency?.code)}
                </p>
                <p class="description">{product.description}</p>
                <button class="add-btn" on:click={handleAddToCart}
                    >Add to Cart</button
                >
            </div>
        </div>

        <ReviewSection {productId} />
        <RecentlyViewed />
    {:else}
        <p>Product not found.</p>
    {/if}
</div>

{#if showLightbox && product?.imageUrl}
    <ImageLightbox
        imageUrl={product.imageUrl}
        altText={product.name}
        onClose={closeLightbox}
    />
{/if}

<style>
    .details {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    .back {
        margin-bottom: 1rem;
        cursor: pointer;
        color: #007bff;
        text-decoration: none;
        background: none;
        border: none;
        font-size: 1rem;
        padding: 0;
        transition: color 0.2s;
    }
    .back:hover {
        color: #0056b3;
        text-decoration: underline;
    }
    .product-container {
        display: flex;
        gap: 3rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }
    .image-wrapper {
        position: relative;
        flex: 1;
        min-width: 300px;
        max-width: 500px;
    }
    .image-wrapper img {
        width: 100%;
        border-radius: 12px;
        cursor: zoom-in;
        transition: transform 0.3s;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .image-wrapper img:hover {
        transform: scale(1.02);
    }
    .zoom-hint {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.85rem;
        opacity: 0;
        transition: opacity 0.2s;
    }
    .image-wrapper:hover .zoom-hint {
        opacity: 1;
    }
    .info {
        flex: 1;
        min-width: 300px;
    }
    h1 {
        margin-top: 0;
        color: #333;
        font-size: 2rem;
    }
    .category {
        color: #666;
        font-size: 0.95rem;
        text-transform: capitalize;
        margin-bottom: 1rem;
    }
    .price {
        font-size: 2rem;
        font-weight: bold;
        color: #28a745;
        margin: 1.5rem 0;
    }
    .description {
        color: #555;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    button.add-btn {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
    button.add-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
    }
    button.add-btn:active {
        transform: translateY(0);
    }
</style>
