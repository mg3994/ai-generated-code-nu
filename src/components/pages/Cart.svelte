<!-- src/components/pages/Cart.svelte -->
<script lang="ts">
    import {
        cartStore,
        removeFromCart,
        clearCart,
    } from "../../jet/intents/cartIntent";
    import { navigate } from "../../stores/routeStore";
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Product } from "../../jet/models/product";
    import type { Currency } from "../../stores/currencyStore";

    let cartItems: Product[] = [];
    let currentCurrency: Currency;

    cartStore.subscribe((items) => {
        cartItems = items;
    });

    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    $: totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    function handleRemove(id: string) {
        removeFromCart(id);
    }

    function handleCheckout() {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Proceeding to checkout... (Mock)");
        clearCart();
        navigate("home");
    }
</script>

<div class="cart-page">
    <button class="back-btn" on:click={() => navigate("home")}
        >&larr; Back to Shopping</button
    >
    <h1>Your Cart</h1>

    {#if cartItems.length === 0}
        <div class="empty-cart">
            <div class="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart!</p>
            <button class="shop-btn" on:click={() => navigate("home")}
                >Start Shopping</button
            >
        </div>
    {:else}
        <div class="cart-items">
            {#each cartItems as item}
                <div class="cart-item">
                    {#if item.imageUrl}
                        <img src={item.imageUrl} alt={item.name} />
                    {/if}
                    <div class="item-details">
                        <h3>{item.name}</h3>
                        <p class="price">
                            {formatPrice(item.price, currentCurrency?.code)}
                        </p>
                    </div>
                    <button
                        class="remove-btn"
                        on:click={() => handleRemove(item.id)}>Remove</button
                    >
                </div>
            {/each}
        </div>

        <div class="summary">
            <div class="total">
                Total: {formatPrice(totalPrice, currentCurrency?.code)}
            </div>
            <button class="checkout-btn" on:click={handleCheckout}
                >Checkout</button
            >
        </div>
    {/if}
</div>

<style>
    .cart-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }
    h1 {
        margin-bottom: 2rem;
    }
    .empty-cart {
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
    .empty-cart h2 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    .empty-cart p {
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
    .cart-item {
        display: flex;
        gap: 1rem;
        border-bottom: 1px solid #eee;
        padding: 1rem 0;
        align-items: center;
    }
    .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
    }
    .item-details {
        flex: 1;
    }
    .item-details h3 {
        margin: 0 0 0.5rem 0;
    }
    .price {
        font-weight: bold;
    }
    .remove-btn {
        color: red;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;
    }
    .remove-btn:hover {
        color: darkred;
    }
    .summary {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        text-align: right;
    }
    .total {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .checkout-btn {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1.1rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .checkout-btn:hover {
        background-color: #218838;
    }
    .back-btn {
        background: none;
        border: none;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        margin-bottom: 1rem;
    }
</style>
