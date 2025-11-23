<!-- src/components/molecules/QuickViewModal.svelte -->
<script lang="ts">
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import { addToCart } from "../../jet/intents/cartIntent";
    import { toggleWishlist } from "../../jet/intents/wishlistIntent";
    import { toastStore } from "../../stores/toastStore";
    import { navigate } from "../../stores/routeStore";

    export let product: Product;
    export let onClose: () => void;

    let currentCurrency: Currency;
    currencyStore.subscribe((value: Currency) => {
        currentCurrency = value;
    });

    function handleAddToCart() {
        addToCart(product);
        toastStore.show(`Added ${product.name} to cart!`, "success");
    }

    function handleToggleWishlist() {
        const added = toggleWishlist(product);
        toastStore.show(
            added
                ? `Added ${product.name} to wishlist!`
                : `Removed from wishlist`,
            added ? "success" : "info",
        );
    }

    function handleViewDetails() {
        navigate("product-details", { id: product.id });
        onClose();
    }

    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            onClose();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
    class="modal-backdrop"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
>
    <div class="modal-content">
        <button class="close-btn" on:click={onClose} aria-label="Close"
            >×</button
        >

        <div class="modal-body">
            <div class="image-section">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div class="info-section">
                <h2>{product.name}</h2>
                {#if product.category}
                    <p class="category">{product.category}</p>
                {/if}
                <p class="price">
                    {formatPrice(product.price, currentCurrency?.code)}
                </p>
                <p class="description">{product.description}</p>

                <div class="actions">
                    <button class="btn-primary" on:click={handleAddToCart}>
                        🛒 Add to Cart
                    </button>
                    <button
                        class="btn-secondary"
                        on:click={handleToggleWishlist}
                    >
                        ❤️ Wishlist
                    </button>
                    <button class="btn-link" on:click={handleViewDetails}>
                        View Full Details →
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 1rem;
        animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
        z-index: 1;
    }

    .close-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .modal-body {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        flex-wrap: wrap;
    }

    .image-section {
        flex: 1;
        min-width: 300px;
    }

    .image-section img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .info-section {
        flex: 1;
        min-width: 300px;
    }

    h2 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1.75rem;
    }

    .category {
        color: #666;
        text-transform: capitalize;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .price {
        font-size: 2rem;
        font-weight: bold;
        color: #28a745;
        margin: 1rem 0;
    }

    .description {
        color: #555;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .btn-primary,
    .btn-secondary,
    .btn-link {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        font-weight: 500;
    }

    .btn-primary {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
    }

    .btn-secondary {
        background: white;
        color: #dc3545;
        border: 2px solid #dc3545;
    }

    .btn-secondary:hover {
        background: #dc3545;
        color: white;
    }

    .btn-link {
        background: none;
        color: #007bff;
        text-decoration: underline;
    }

    .btn-link:hover {
        color: #0056b3;
    }

    @media (max-width: 768px) {
        .modal-body {
            flex-direction: column;
        }
    }
</style>
