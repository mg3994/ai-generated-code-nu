<!-- src/App.svelte -->
<script lang="ts">
    import Header from "./components/organisms/Header.svelte";
    import Home from "./components/pages/Home.svelte";
    import ProductDetails from "./components/pages/ProductDetails.svelte";
    import Cart from "./components/pages/Cart.svelte";
    import Wishlist from "./components/pages/Wishlist.svelte";
    import Compare from "./components/pages/Compare.svelte";
    import ToastContainer from "./components/organisms/ToastContainer.svelte";
    import ComparisonBar from "./components/organisms/ComparisonBar.svelte";
    import { routeStore } from "./stores/routeStore";
    import type { Route } from "./stores/routeStore";

    let currentRoute: Route;
    routeStore.subscribe((value: Route) => {
        currentRoute = value;
    });
</script>

<ToastContainer />
<ComparisonBar />
<Header />
<main>
    {#if currentRoute.name === "home"}
        <Home />
    {:else if currentRoute.name === "product-details"}
        <ProductDetails productId={currentRoute.params?.id} />
    {:else if currentRoute.name === "cart"}
        <Cart />
    {:else if currentRoute.name === "wishlist"}
        <Wishlist />
    {:else if currentRoute.name === "compare"}
        <Compare />
    {:else}
        <p>Page not found</p>
    {/if}
</main>

<style>
    /* Basic layout, you can extend with your design system */
    main {
        padding: 2rem;
    }
</style>
