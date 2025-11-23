<script lang="ts">
    export let message = "Loading...";
</script>

<!-- src/components/atoms/LoadingSpinner.svelte -->
<div class="spinner-container">
    <div class="spinner"></div>
    <p>{message}</p>
</div>

<style>
    .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    p {
        margin-top: 1rem;
        color: #666;
        font-style: italic;
    }
</style>
