<!-- src/components/atoms/Badge.svelte -->
<script lang="ts">
    export let count: number;
    export let variant: "primary" | "danger" | "success" = "primary";
</script>

{#if count > 0}
    <span class="badge badge-{variant}">
        {count > 99 ? "99+" : count}
    </span>
{/if}

<style>
    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white;
        line-height: 1;
    }

    .badge-primary {
        background: #007bff;
    }

    .badge-danger {
        background: #dc3545;
    }

    .badge-success {
        background: #28a745;
    }
</style>
