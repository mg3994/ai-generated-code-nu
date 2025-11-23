<!-- src/components/molecules/ProductCard.svelte -->
<script lang="ts">
    import type { Product } from "../../jet/models/product";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";

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
    {#if product.imageUrl}
        <img src={product.imageUrl} alt={product.name} />
    {/if}
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <div class="price">
        {formatPrice(product.price, currentCurrency?.code)}
    </div>
    <button on:click={handleAddToCart}>Add to Cart</button>
</div>

<style>
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: var(--card-bg, #fff);
        color: var(--card-text, #000);
        cursor: pointer;
        transition: transform 0.2s;
    }
    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .card img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }
    .card h3 {
        margin: 0 0 0.5rem 0;
    }
    .card p {
        margin: 0 0 1rem 0;
        color: #666;
    }
    .price {
        font-weight: bold;
        margin-bottom: 1rem;
    }
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
