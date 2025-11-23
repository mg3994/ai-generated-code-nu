<!-- src/components/molecules/SearchBar.svelte -->
<script lang="ts">
    import type { Product } from "../../jet/models/product";
    import { navigate } from "../../stores/routeStore";

    export let onSearch: (query: string) => void;
    export let suggestions: Product[] = [];

    let query = "";
    let showSuggestions = false;
    let selectedIndex = -1;

    function handleInput() {
        showSuggestions = query.length > 0 && suggestions.length > 0;
        selectedIndex = -1;
    }

    function handleSearch() {
        onSearch(query);
        showSuggestions = false;
    }

    function selectSuggestion(product: Product) {
        navigate("product-details", { id: product.id });
        query = "";
        showSuggestions = false;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                selectedIndex = Math.min(
                    selectedIndex + 1,
                    suggestions.length - 1,
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    selectSuggestion(suggestions[selectedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case "Escape":
                showSuggestions = false;
                break;
        }
    }

    function handleBlur() {
        // Delay to allow click on suggestion
        setTimeout(() => {
            showSuggestions = false;
        }, 200);
    }
</script>

<div class="search-bar">
    <input
        type="text"
        bind:value={query}
        on:input={handleInput}
        on:keydown={handleKeydown}
        on:blur={handleBlur}
        on:focus={handleInput}
        placeholder="Search products..."
        class="search-input"
    />
    <button on:click={handleSearch} class="search-button"> 🔍 Search </button>

    {#if showSuggestions}
        <div class="suggestions">
            {#each suggestions as product, i}
                <button
                    class="suggestion-item {i === selectedIndex
                        ? 'selected'
                        : ''}"
                    on:click={() => selectSuggestion(product)}
                >
                    {#if product.imageUrl}
                        <img src={product.imageUrl} alt={product.name} />
                    {/if}
                    <div class="suggestion-info">
                        <div class="suggestion-name">{product.name}</div>
                        {#if product.category}
                            <div class="suggestion-category">
                                {product.category}
                            </div>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .search-bar {
        position: relative;
        display: flex;
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto 2rem;
    }

    .search-input {
        flex: 1;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        transition: border-color 0.2s;
    }

    .search-input:focus {
        outline: none;
        border-color: #007bff;
    }

    .search-button {
        padding: 0.75rem 2rem;
        font-size: 1rem;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        transition: background-color 0.2s;
        white-space: nowrap;
    }

    .search-button:hover {
        background-color: #0056b3;
    }

    .suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 80px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
    }

    .suggestion-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border: none;
        background: white;
        width: 100%;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.2s;
        border-bottom: 1px solid #f0f0f0;
    }

    .suggestion-item:last-child {
        border-bottom: none;
    }

    .suggestion-item:hover,
    .suggestion-item.selected {
        background-color: #f8f9fa;
    }

    .suggestion-item img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 4px;
    }

    .suggestion-info {
        flex: 1;
    }

    .suggestion-name {
        font-weight: 500;
        color: #333;
        margin-bottom: 0.25rem;
    }

    .suggestion-category {
        font-size: 0.85rem;
        color: #666;
        text-transform: capitalize;
    }
</style>
