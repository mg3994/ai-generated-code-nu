<!-- src/components/pages/Home.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { searchProducts } from "../../jet/intents/searchIntent";
  import type { Product } from "../../jet/models/product";
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
