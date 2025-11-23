<!-- src/components/pages/Compare.svelte -->
<script lang="ts">
    import {
        comparisonStore,
        clearComparison,
    } from "../../jet/intents/comparisonIntent";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";
    import { toastStore } from "../../stores/toastStore";

    let compareProducts: Product[] = [];
    let currentCurrency: Currency;

    // Subscribe to stores
    comparisonStore.subscribe((items) => {
        compareProducts = items;
    });
    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    function handleAddToCart(product: Product) {
        addToCart(product);
        toastStore.show(`Added ${product.name} to cart!`, "success");
    }

    function handleClearAll() {
        clearComparison();
        navigate("home");
    }

    const features = [
        { key: "name", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price" },
        { key: "description", label: "Description" },
    ];
</script>

<div class="compare-page">
    <div class="header">
        <button type="button" class="back-btn" on:click={() => navigate("home")}
            >← Back</button
        >
        <h1>Product Comparison</h1>
        <button type="button" class="clear-btn" on:click={handleClearAll}
            >Clear All</button
        >
    </div>

    {#if compareProducts.length < 2}
        <div class="empty-state">
            <h2>Add at least 2 products to compare</h2>
            <p>Select products from the catalog to see them side by side</p>
            <button class="shop-btn" on:click={() => navigate("home")}
                >Browse Products</button
            >
        </div>
    {:else}
        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th class="feature-col">Features</th>
                        {#each compareProducts as product}
                            <th class="product-col">
                                <div class="product-header">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />
                                    <button
                                        class="add-cart"
                                        on:click={() =>
                                            handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each features as feature}
                        <tr>
                            <td class="feature-label">{feature.label}</td>
                            {#each compareProducts as product}
                                <td class="feature-value">
                                    {#if feature.key === "price"}
                                        <strong class="price"
                                            >{formatPrice(
                                                product.price,
                                                currentCurrency?.code,
                                            )}</strong
                                        >
                                    {:else if feature.key === "category"}
                                        <span class="category"
                                            >{product.category || "N/A"}</span
                                        >
                                    {:else}
                                        {product[feature.key] || "N/A"}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .compare-page {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    .back-btn,
    .clear-btn {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        transition: color 0.2s;
    }
    .back-btn:hover,
    .clear-btn:hover {
        color: #0056b3;
        text-decoration: underline;
    }
    h1 {
        margin: 0;
        color: #333;
    }
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: #f8f9fa;
        border-radius: 12px;
    }
    .empty-state h2 {
        color: #333;
        margin-bottom: 1rem;
    }
    .empty-state p {
        color: #666;
        margin-bottom: 2rem;
    }
    .shop-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s;
    }
    .shop-btn:hover {
        background: #0056b3;
    }
    .comparison-table {
        overflow-x: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    th,
    td {
        padding: 1.5rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
    }
    .feature-col {
        width: 200px;
        position: sticky;
        left: 0;
        background: #f8f9fa;
        z-index: 1;
    }
    .product-col {
        min-width: 250px;
    }
    .product-header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    .product-header img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }
    .add-cart {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: transform 0.2s;
    }
    .add-cart:hover {
        transform: translateY(-2px);
    }
    .feature-label {
        font-weight: 600;
        color: #555;
        background: #f8f9fa;
        position: sticky;
        left: 0;
    }
    .feature-value {
        color: #333;
    }
    .price {
        color: #28a745;
        font-size: 1.25rem;
    }
    .category {
        text-transform: capitalize;
        color: #666;
    }
    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            gap: 1rem;
        }
        .feature-col {
            width: 120px;
        }
        .product-col {
            min-width: 200px;
        }
    }
</style>
