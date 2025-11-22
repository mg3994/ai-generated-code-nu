<!-- src/components/pages/Home.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { searchProducts } from '../../jet/intents/searchIntent';
  import type { Product } from '../../jet/models/product';

  let query = '';
  let results: Product[] = [];

  async function handleSearch() {
    if (query.trim()) {
      results = await searchProducts(query);
    }
  }

  onMount(() => {
    // placeholder: could load featured products
  });
</script>

<style>
  .home { padding: 2rem; }
  .search { margin-bottom: 1rem; }
</style>

<div class="home">
  <h1>LinkWithMentor</h1>
  <div class="search">
    <input type="text" bind:value={query} placeholder="Search products..." />
    <button on:click={handleSearch}>Search</button>
  </div>
  {#if results.length}
    <ul>
      {#each results as product}
        <li>{product.name} – {product.price} {product.currency}</li>
      {/each}
    </ul>
  {/if}
</div>
