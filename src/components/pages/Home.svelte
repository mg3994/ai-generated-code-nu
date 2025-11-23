<!-- src/components/pages/Home.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { searchProducts } from "../../jet/intents/searchIntent";
  import type { Product } from "../../jet/models/product";
  import ProductCard from "../molecules/ProductCard.svelte";

  let query = "";
  let results: Product[] = [];
  let loading = false;

  async function handleSearch() {
    loading = true;
    try {
      results = await searchProducts(query);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    handleSearch(); // Load initial data
  });
</script>

<div class="home">
  <h1>LinkWithMentor Store</h1>

  <div class="search">
    <input
      type="text"
      bind:value={query}
      placeholder="Search products..."
      on:keydown={(e) => e.key === "Enter" && handleSearch()}
    />
    <button on:click={handleSearch} disabled={loading}>
      {loading ? "Searching..." : "Search"}
    </button>
  </div>

  {#if loading}
    <p class="loading">Loading products...</p>
  {:else if results.length}
    <div class="grid">
      {#each results as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  {:else}
    <p>No products found.</p>
  {/if}
</div>

<style>
  .home {
    padding: 2rem;
  }
  .search {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
  }
  .search input {
    padding: 0.5rem;
    font-size: 1rem;
    flex: 1;
    max-width: 400px;
  }
  .search button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  .loading {
    color: #666;
    font-style: italic;
  }
</style>
