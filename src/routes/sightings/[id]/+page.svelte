<script lang="ts">
    let { data } = $props();
</script>

<div class="modal-backdrop" onclick={() => window.history.back()}></div>
  
<div class="modal">
    <h2>{data.sighting.Animal}</h2>
    <p>{data.sighting.Reporter}</p>
    <button onclick={() => window.history.back()}>Close</button>
</div>
  
<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        z-index: 1001;
        max-width: 400px;
        width: 90%;
    }
</style>