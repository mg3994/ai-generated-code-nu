<!-- src/App.svelte -->
<script lang="ts">
    import Header from "./components/organisms/Header.svelte";
    import Home from "./components/pages/Home.svelte";
    import ProductDetails from "./components/pages/ProductDetails.svelte";
    import { routeStore } from "./stores/routeStore";
    import type { Route } from "./stores/routeStore";

    let currentRoute: Route;
    routeStore.subscribe((value: Route) => {
        currentRoute = value;
    });
</script>

<Header />
<main>
    {#if currentRoute.name === "home"}
        <Home />
    {:else if currentRoute.name === "product-details"}
        <ProductDetails productId={currentRoute.params?.id} />
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
