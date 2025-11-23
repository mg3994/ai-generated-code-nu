<!-- src/components/pages/ProductDetails.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";

        loading = true;
        await new Promise((r) => setTimeout(r, 500));

        // Mock data (should match searchIntent mock data for consistency)
        // Ideally we have a getProductById intent.
        product = {
            id: productId as any,
            name: "Mock Product " + productId,
            description: "This is a detailed description of the product.",
            price: 2500,
            currency: "USD",
            imageUrl:
                "https://via.placeholder.com/600x400?text=Product+" + productId,
        };
        loading = false;
    });

    function handleAddToCart() {
        if (product) {
            addToCart(product);
            alert("Added to cart!");
        }
    }
</script>

<div class="details">
    <button class="back" on:click={() => navigate("home")}
        >&larr; Back to Home</button
    >

    {#if loading}
        <p>Loading product details...</p>
    {:else if product}
        <div class="product-container">
            <img src={product.imageUrl} alt={product.name} />
            <div class="info">
                <h1>{product.name}</h1>
                <p class="price">
                    {formatPrice(product.price, currentCurrency?.code)}
                </p>
                <p>{product.description}</p>
                <button class="add-btn" on:click={handleAddToCart}
                    >Add to Cart</button
                >
            </div>
        </div>
    {:else}
        <p>Product not found.</p>
    {/if}
</div>

<style>
    .details {
        padding: 2rem;
    }
    .back {
        margin-bottom: 1rem;
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        background: none;
        border: none;
        font-size: 1rem;
        padding: 0;
    }
    .product-container {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }
    img {
        max-width: 100%;
        border-radius: 8px;
    }
    .info {
        flex: 1;
        min-width: 300px;
    }
    h1 {
        margin-top: 0;
    }
    .price {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 1rem 0;
    }
    button.add-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1.1rem;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
