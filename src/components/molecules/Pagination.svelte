<!-- src/components/molecules/Pagination.svelte -->
<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let onPageChange: (page: number) => void;

    $: pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    function getVisiblePages(): number[] {
        if (totalPages <= 7) return pages;

        if (currentPage <= 3) {
            return [...pages.slice(0, 5), -1, totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, -1, ...pages.slice(totalPages - 5)];
        }

        return [
            1,
            -1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            -2,
            totalPages,
        ];
    }

    $: visiblePages = getVisiblePages();
</script>

{#if totalPages > 1}
    <div class="pagination">
        <button
            class="page-btn"
            disabled={currentPage === 1}
            on:click={() => onPageChange(currentPage - 1)}
        >
            ← Previous
        </button>

        {#each visiblePages as page}
            {#if page === -1 || page === -2}
                <span class="ellipsis">...</span>
            {:else}
                <button
                    class="page-btn {page === currentPage ? 'active' : ''}"
                    on:click={() => onPageChange(page)}
                >
                    {page}
                </button>
            {/if}
        {/each}

        <button
            class="page-btn"
            disabled={currentPage === totalPages}
            on:click={() => onPageChange(currentPage + 1)}
        >
            Next →
        </button>
    </div>
{/if}

<style>
    .pagination {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    .page-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        background-color: white;
        color: #333;
        cursor: pointer;
        border-radius: 4px;
        font-size: 0.95rem;
        transition: all 0.2s;
    }

    .page-btn:hover:not(:disabled):not(.active) {
        background-color: #f8f9fa;
        border-color: #007bff;
    }

    .page-btn.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }

    .page-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .ellipsis {
        padding: 0.5rem;
        color: #666;
    }
</style>
