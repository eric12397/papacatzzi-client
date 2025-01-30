<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "$lib/components/AddPhoto.svelte";
	import { image } from "$lib/states/image.svelte";

    let formData = $state({
        reporter: "",
        animal:      "",
        description: "",
    })

    let btnDisabled = $derived(
        image.photoURL && formData.description && formData.animal ? false : true
    )

    const handleSubmit = async () => {
        const body: CreateSighting = {
            ...image.toJSON(),
            ...formData
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sightings`, {
                method: "POST",
                body:  JSON.stringify(body),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to post new sighting: ${response.statusText}`);
            }

            goto("/")

        } catch (error) {
            console.error('Error fetching sighting details:', error);
            throw error;
        }
    }
</script>

<form class="flex justify-center" onsubmit={handleSubmit}>
    <div class="flex flex-col w-screen md:w-1/3 lg:w-1/2 space-y-4 p-3">
        <div class="flex items-center mt-3">
            <i class="cursor-pointer fa-solid fa-arrow-left fa-xl" onclick={() => goto("/")}></i>
            <h1 class="font-bold text-center text-xl flex-1">Report a sighting:</h1>
        </div>
        
        <textarea
            class="rounded-lg border-gray-300"
            placeholder="Enter details about the photo"
            bind:value={formData.description}>
        </textarea>
       
        {#if image.photoURL}
            <div class="relative inline-block">
                <div class="rounded-lg overflow-hidden bg-gray-100">
                    <img 
                        class="w-full h-full object-cover"
                        src={image.photoURL} 
                        alt="Preview" 
                        style=""  
                    />
                </div>
                <button
                    onclick={image.clearImage}
                    aria-label="Delete image"
                    class="absolute top-2 right-2 w-8 h-8 
                    bg-black bg-opacity-60 rounded-full 
                    items-center justify-center hover:bg-white transition"
                >
                    🗑️
                </button>
            </div>
        {:else}
            <label for="fileInput" class="button">📷</label>
            <AddPhoto />
        {/if}

        <label>
            Animal:
            <select 
                class="w-24 ml-2 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3"
                name="animal" id="animalType" bind:value={formData.animal}>
                <option>Cat</option>
                <option>Dog</option>
            </select>
        </label>

        <input hidden bind:value={formData.reporter}>

        <button 
            disabled={btnDisabled}
            class="py-4 px-16 rounded-lg text-white font-bold transition
                {btnDisabled ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
            >
            Upload
        </button>
    </div>
</form>