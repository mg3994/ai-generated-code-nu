<!-- src/components/organisms/ComparisonBar.svelte -->
<script lang="ts">
    import {
        comparisonStore,
        removeFromComparison,
        clearComparison,
    } from "../../jet/intents/comparisonIntent";
    import { navigate } from "../../stores/routeStore";
    import type { Product } from "../../jet/models/product";

    let compareProducts: Product[] = [];

    comparisonStore.subscribe((items) => {
        compareProducts = items;
    });

    function handleRemove(id: string) {
        removeFromComparison(id);
    }

    function handleCompare() {
        navigate("compare");
    }

    function handleClear() {
        clearComparison();
    }
</script>

{#if compareProducts.length > 0}
    <div class="comparison-bar">
        <div class="bar-content">
            <div class="products">
                {#each compareProducts as product}
                    <div class="compare-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <button
                            class="remove"
                            on:click={() => handleRemove(product.id)}>×</button
                        >
                    </div>
                {/each}
            </div>

            <div class="actions">
                <span class="count">{compareProducts.length}/4</span>
                <button
                    class="btn-compare"
                    on:click={handleCompare}
                    disabled={compareProducts.length < 2}
                >
                    Compare ({compareProducts.length})
                </button>
                <button class="btn-clear" on:click={handleClear}>Clear</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .comparison-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    .bar-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .products {
        display: flex;
        gap: 1rem;
        flex: 1;
        overflow-x: auto;
    }

    .compare-item {
        position: relative;
        flex: 0 0 80px;
    }

    .compare-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        border: 2px solid #007bff;
    }

    .remove {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #dc3545;
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
    }

    .remove:hover {
        transform: scale(1.1);
    }

    .actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .count {
        color: #666;
        font-size: 0.9rem;
    }

    .btn-compare,
    .btn-clear {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        border: none;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .btn-compare {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
    }

    .btn-compare:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }

    .btn-compare:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-clear {
        background: white;
        color: #dc3545;
        border: 2px solid #dc3545;
    }

    .btn-clear:hover {
        background: #dc3545;
        color: white;
    }

    @media (max-width: 768px) {
        .bar-content {
            flex-direction: column;
            gap: 1rem;
        }

        .actions {
            width: 100%;
            justify-content: space-between;
        }
    }
</style>
