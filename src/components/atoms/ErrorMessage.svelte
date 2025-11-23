<!-- src/components/atoms/ErrorMessage.svelte -->
<script lang="ts">
    export let message: string;
    export let onRetry: (() => void) | null = null;
</script>

<div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{message}</p>
    {#if onRetry}
        <button on:click={onRetry}>Try Again</button>
    {/if}
</div>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        text-align: center;
    }

    .error-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    h3 {
        color: #d32f2f;
        margin: 0 0 0.5rem 0;
    }

    p {
        color: #666;
        margin: 0 0 1.5rem 0;
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
