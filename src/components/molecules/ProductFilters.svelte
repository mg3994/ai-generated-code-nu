<!-- src/components/molecules/ProductFilters.svelte -->
<script lang="ts">
    export let onFilterChange: (filters: {
        category: string;
        sortBy: string;
    }) => void;

    let selectedCategory = "all";
    let selectedSort = "default";

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "electronics", label: "Electronics" },
        { value: "jewelery", label: "Jewelry" },
        { value: "men's clothing", label: "Men's Clothing" },
        { value: "women's clothing", label: "Women's Clothing" },
    ];

    const sortOptions = [
        { value: "default", label: "Default" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "name-asc", label: "Name: A to Z" },
        { value: "name-desc", label: "Name: Z to A" },
    ];

    function handleChange() {
        onFilterChange({ category: selectedCategory, sortBy: selectedSort });
    }
</script>

<div class="filters">
    <div class="filter-group">
        <label for="category">Category:</label>
        <select
            id="category"
            bind:value={selectedCategory}
            on:change={handleChange}
        >
            {#each categories as cat}
                <option value={cat.value}>{cat.label}</option>
            {/each}
        </select>
    </div>

    <div class="filter-group">
        <label for="sort">Sort By:</label>
        <select id="sort" bind:value={selectedSort} on:change={handleChange}>
            {#each sortOptions as opt}
                <option value={opt.value}>{opt.label}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    .filters {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        flex-wrap: wrap;
    }

    .filter-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        color: #333;
    }

    select {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        font-size: 0.95rem;
        min-width: 180px;
    }

    select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
</style>
