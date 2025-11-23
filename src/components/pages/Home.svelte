<!-- src/components/pages/Home.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { searchProducts } from "../../jet/intents/searchIntent";
  import type { Product } from "../../jet/models/product";
  import ProductCard from "../molecules/ProductCard.svelte";
  import LoadingSpinner from "../atoms/LoadingSpinner.svelte";
  import ErrorMessage from "../atoms/ErrorMessage.svelte";
  import ProductFilters from "../molecules/ProductFilters.svelte";
  import Pagination from "../molecules/Pagination.svelte";
  import SearchBar from "../molecules/SearchBar.svelte";
  import PriceRangeFilter from "../molecules/PriceRangeFilter.svelte";

  let query = "";
  let allProducts: Product[] = [];
  let filteredProducts: Product[] = [];
  let displayedProducts: Product[] = [];
  let loading = false;
  let error: string | null = null;

  // Filter and pagination state
  let selectedCategory = "all";
  let selectedSort = "default";
  let currentPage = 1;
  const itemsPerPage = 6;

  // Price range state
  let priceMin = 0;
  let priceMax = 0;
  let currentMin = 0;
  let currentMax = 0;

  $: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  $: {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    displayedProducts = filteredProducts.slice(start, end);
  }

  // Search suggestions
  $: searchSuggestions =
    query.length > 0
      ? allProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  async function loadProducts() {
    loading = true;
    error = null;
    try {
      allProducts = await searchProducts("");
      const prices = allProducts.map((p) => p.price);
      priceMin = Math.min(...prices);
      priceMax = Math.max(...prices);
      currentMin = priceMin;
      currentMax = priceMax;
      applyFiltersAndSort();
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to load products";
      allProducts = [];
      filteredProducts = [];
    } finally {
      loading = false;
    }
  }

  function applyFiltersAndSort() {
    let filtered =
      selectedCategory === "all"
        ? [...allProducts]
        : allProducts.filter((p) => p.category === selectedCategory);
    if (query.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()),
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= currentMin && p.price <= currentMax,
    );
    switch (selectedSort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    filteredProducts = filtered;
    currentPage = 1;
  }

  function handleSearch(q: string) {
    query = q;
    applyFiltersAndSort();
  }

  function handleFilterChange({
    category,
    sortBy,
  }: {
    category: string;
    sortBy: string;
  }) {
    selectedCategory = category;
    selectedSort = sortBy;
    applyFiltersAndSort();
  }

  function handlePriceRangeChange(min: number, max: number) {
    currentMin = min;
    currentMax = max;
    applyFiltersAndSort();
  }

  function handlePageChange(page: number) {
    currentPage = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    loadProducts();
  });
</script>

<div class="home">
  <h1>LinkWithMentor Store</h1>
  <p class="subtitle">Discover amazing products from our curated collection</p>
  <SearchBar onSearch={handleSearch} suggestions={searchSuggestions} />
  {#if !loading && !error}
    <ProductFilters onFilterChange={handleFilterChange} />
    <PriceRangeFilter
      minPrice={priceMin}
      maxPrice={priceMax}
      {currentMin}
      {currentMax}
      onChange={handlePriceRangeChange}
    />
    />
  {/if}
  {#if loading}
    <LoadingSpinner message="Loading products..." />
  {:else if error}
    <ErrorMessage message={error} onRetry={loadProducts} />
  {:else if displayedProducts.length}
    <div class="results-info">
      Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(
        currentPage * itemsPerPage,
        filteredProducts.length,
      )} of {filteredProducts.length} products
    </div>
    <div class="grid">
      {#each displayedProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
    <Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
  {:else}
    <p class="no-results">
      No products found. Try adjusting your filters or search term.
    </p>
  {/if}
</div>

<style>
  .home {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .results-info {
    text-align: center;
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .no-results {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-top: 3rem;
    padding: 3rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
</style>
