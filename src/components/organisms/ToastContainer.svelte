<!-- src/components/organisms/ToastContainer.svelte -->
<script lang="ts">
    import { toastStore } from "../../stores/toastStore";
    import type { Toast } from "../../stores/toastStore";

    let toasts: Toast[] = [];
    toastStore.subscribe((value) => {
        toasts = value;
    });
</script>

<div class="toast-container">
    {#each toasts as toast (toast.id)}
        <div class="toast toast-{toast.type}" role="alert">
            <span class="toast-message">{toast.message}</span>
            <button
                class="toast-close"
                on:click={() => toastStore.dismiss(toast.id)}>×</button
            >
        </div>
    {/each}
</div>

<style>
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
    }

    .toast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
        min-width: 300px;
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .toast-success {
        background-color: #d4edda;
        color: #155724;
        border-left: 4px solid #28a745;
    }

    .toast-error {
        background-color: #f8d7da;
        color: #721c24;
        border-left: 4px solid #dc3545;
    }

    .toast-info {
        background-color: #d1ecf1;
        color: #0c5460;
        border-left: 4px solid #17a2b8;
    }

    .toast-message {
        flex: 1;
        font-size: 0.95rem;
    }

    .toast-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .toast-close:hover {
        opacity: 1;
    }
</style>
