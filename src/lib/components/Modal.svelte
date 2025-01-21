<script lang="ts">
    let { close, children }: { close: () => void, children: any } = $props()
</script>

<div 
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[1000]"
    onclick={close}
/>

<div
    class="flex flex-col w-full h-full fixed bg-white z-[1001]
    md:w-[500px] md:h-[600px] md:rounded-lg md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
>
    {@render children()}
</div>