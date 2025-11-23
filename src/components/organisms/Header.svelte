<!-- src/components/organisms/Header.svelte -->
<script lang="ts">
    import { cartStore } from "../../jet/intents/cartIntent";
    import { wishlistStore } from "../../jet/intents/wishlistIntent";
    import { themeStore, getEffectiveTheme } from "../../stores/themeStore";
    import { localeStore, SUPPORTED_LOCALES } from "../../stores/localeStore";
    import {
        currencyStore,
        SUPPORTED_CURRENCIES,
    } from "../../stores/currencyStore";
    import type { ThemeMode } from "../../stores/themeStore";
    import type { Product } from "../../jet/models/product";
    import type { LocaleInfo } from "../../stores/localeStore";
    import type { Currency } from "../../stores/currencyStore";
    import { navigate } from "../../stores/routeStore";
    import Badge from "../atoms/Badge.svelte";

    // Subscribe to stores
    let cartCount = 0;
    cartStore.subscribe((items: Product[]) => {
        cartCount = items.length;
    });

    let wishlistCount = 0;
    wishlistStore.subscribe((items: Product[]) => {
        wishlistCount = items.length;
    });

    let currentTheme: ThemeMode;
    themeStore.subscribe((value: ThemeMode) => {
        currentTheme = value;
        updateBodyClass(value);
    });

    let currentLocale: LocaleInfo;
    localeStore.subscribe((value: LocaleInfo) => {
        currentLocale = value;
    });

    let currentCurrency: Currency;
    currencyStore.subscribe((value: Currency) => {
        currentCurrency = value;
    });

    function toggleTheme() {
        const modes: ThemeMode[] = ["system", "light", "dark"];
        const nextIndex = (modes.indexOf(currentTheme) + 1) % modes.length;
        themeStore.set(modes[nextIndex]);
    }

    function updateBodyClass(mode: ThemeMode) {
        const effective = getEffectiveTheme(mode);
        document.body.className = effective;
    }

    function handleLocaleChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        localeStore.setLocale(select.value);
    }

    function handleCurrencyChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        currencyStore.setCurrency(select.value);
    }
</script>

<header>
    <a href="/" class="logo">LinkWithMentor</a>

    <div class="actions">
        <select on:change={handleLocaleChange} value={currentLocale?.code}>
            {#each SUPPORTED_LOCALES as locale (locale.code)}
                <option value={locale.code}>{locale.flag} {locale.name}</option>
            {/each}
        </select>

        <select on:change={handleCurrencyChange} value={currentCurrency?.code}>
            {#each SUPPORTED_CURRENCIES as currency (currency.code)}
                <option value={currency.code}
                    >{currency.symbol} {currency.code}</option
                >
            {/each}
        </select>

        <button on:click={toggleTheme}>
            Theme: {currentTheme}
        </button>

        <button class="icon-btn" on:click={() => navigate("wishlist")}>
            ❤️ Wishlist
            <Badge count={wishlistCount} variant="danger" />
        </button>

        <button class="icon-btn" on:click={() => navigate("cart")}>
            🛒 Cart
            <Badge count={cartCount} variant="primary" />
        </button>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: var(--header-bg, #f8f9fa);
        border-bottom: 1px solid #e9ecef;
    }
    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        color: inherit;
    }
    .actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    select,
    button {
        background: none;
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }
    button:hover,
    select:hover {
        background-color: #e9ecef;
    }
    .icon-btn {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>
