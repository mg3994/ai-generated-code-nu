<!-- src/components/molecules/ImageLightbox.svelte -->
<script lang="ts">
    export let imageUrl: string;
    export let altText: string;
    export let onClose: () => void;

    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            onClose();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
    class="lightbox"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
>
    <button class="close-btn" on:click={onClose} aria-label="Close lightbox"
        >×</button
    >
    <div class="image-container">
        <img src={imageUrl} alt={altText} />
    </div>
</div>

<style>
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .close-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 10001;
        line-height: 1;
        padding: 0;
        width: 50px;
        height: 50px;
        transition: transform 0.2s;
    }

    .close-btn:hover {
        transform: scale(1.1);
    }

    .image-container {
        max-width: 90vw;
        max-height: 90vh;
        animation: zoomIn 0.3s ease-out;
    }

    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .image-container img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 8px;
    }
</style>
