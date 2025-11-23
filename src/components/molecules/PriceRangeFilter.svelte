<!-- src/components/molecules/PriceRangeFilter.svelte -->
<script lang="ts">
    import { currencyStore, formatPrice } from "../../stores/currencyStore";
    import type { Currency } from "../../stores/currencyStore";

    export let minPrice: number;
    export let maxPrice: number;
    export let currentMin: number;
    export let currentMax: number;
    export let onChange: (min: number, max: number) => void;

    let currentCurrency: Currency;
    let localMin = currentMin;
    let localMax = currentMax;

    currencyStore.subscribe((value) => {
        currentCurrency = value;
    });

    function handleMinChange(e: Event) {
        const target = e.target as HTMLInputElement;
        localMin = parseInt(target.value);
        if (localMin > localMax) {
            localMin = localMax;
        }
        onChange(localMin, localMax);
    }

    function handleMaxChange(e: Event) {
        const target = e.target as HTMLInputElement;
        localMax = parseInt(target.value);
        if (localMax < localMin) {
            localMax = localMin;
        }
        onChange(localMin, localMax);
    }

    function resetRange() {
        localMin = minPrice;
        localMax = maxPrice;
        onChange(localMin, localMax);
    }

    $: percentage = ((localMax - localMin) / (maxPrice - minPrice)) * 100;
</script>

<div class="price-filter">
    <div class="header">
        <h4>Price Range</h4>
        <button class="reset-btn" on:click={resetRange}>Reset</button>
    </div>

    <div class="range-display">
        <span class="price">{formatPrice(localMin, currentCurrency?.code)}</span
        >
        <span class="separator">-</span>
        <span class="price">{formatPrice(localMax, currentCurrency?.code)}</span
        >
    </div>

    <div class="sliders">
        <input
            type="range"
            min={minPrice}
            max={maxPrice}
            bind:value={localMin}
            on:input={handleMinChange}
            class="slider slider-min"
        />
        <input
            type="range"
            min={minPrice}
            max={maxPrice}
            bind:value={localMax}
            on:input={handleMaxChange}
            class="slider slider-max"
        />
    </div>

    <div class="range-bar">
        <div
            class="range-fill"
            style="left: {((localMin - minPrice) / (maxPrice - minPrice)) *
                100}%; width: {percentage}%"
        ></div>
    </div>
</div>

<style>
    .price-filter {
        padding: 1rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    h4 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }

    .reset-btn {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        font-size: 0.85rem;
        padding: 0;
        text-decoration: underline;
    }

    .reset-btn:hover {
        color: #0056b3;
    }

    .range-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .price {
        font-weight: 600;
        color: #28a745;
    }

    .separator {
        color: #666;
    }

    .sliders {
        position: relative;
        height: 40px;
        margin-bottom: 0.5rem;
    }

    .slider {
        position: absolute;
        width: 100%;
        height: 6px;
        background: transparent;
        pointer-events: none;
        -webkit-appearance: none;
        appearance: none;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
        pointer-events: all;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
        pointer-events: all;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .range-bar {
        position: relative;
        height: 6px;
        background: #e0e0e0;
        border-radius: 3px;
    }

    .range-fill {
        position: absolute;
        height: 100%;
        background: linear-gradient(90deg, #007bff, #0056b3);
        border-radius: 3px;
        transition: all 0.2s;
    }
</style>
