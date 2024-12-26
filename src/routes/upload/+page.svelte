<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "$lib/components/AddPhoto.svelte";
	import { imageStore } from "$lib/stores/image";

    const initialFormData = {  
        Reporter: "",
        PhotoURL:    "",
        Animal:      "",
        Description: "",
        Latitude:    0,
        Longitude:   0,
        Timestamp: Date.now()
    }

    let formData: CreateSighting = $state(initialFormData)
    let btnDisabled = $derived(
        formData.PhotoURL && formData.Description && formData.Animal ? false:true
    )

    imageStore.subscribe((image) => {
        if (image) {
            formData.PhotoURL = image.src
            formData.Latitude = image.latitude
            formData.Longitude = image.longitude
            formData.Timestamp = image.timestamp
        }
    })

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/sightings`, {
                method: "POST",
                body:  JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to post new sighting: ${response.statusText}`);
            }

            goto("/maps")

        } catch (error) {
            console.error('Error fetching sighting details:', error);
            throw error;
        }
    }

    const clearImage = () => {
        formData = initialFormData
    };
 
    const goToMaps = () => {
        goto("/maps")
    }
</script>

<form class="flex justify-center" onsubmit={handleSubmit}>
    <div class="flex flex-col w-screen md:w-1/3 lg:w-1/2 space-y-4 p-3">
        <div class="flex items-center mt-3">
            <i class="cursor-pointer fa-solid fa-arrow-left fa-xl" onclick={goToMaps}></i>
            <h1 class="font-bold text-center text-xl flex-1">Report a sighting:</h1>
        </div>
        
        <textarea
            class="rounded-lg border-gray-300"
            placeholder="Enter details about the photo"
            bind:value={formData.Description}>
        </textarea>
       
        {#if formData.PhotoURL}
            <div class="relative inline-block">
                <div class="rounded-lg overflow-hidden bg-gray-100">
                    <img 
                        class="w-full h-full object-cover"
                        src={formData.PhotoURL} 
                        alt="Preview" 
                        style=""  
                    />
                </div>
                <button
                    onclick={clearImage}
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
                name="animal" id="animalType" bind:value={formData.Animal}>
                <option>Cat</option>
                <option>Dog</option>
            </select>
        </label>

        <input hidden bind:value={formData.Reporter}>

        <button 
            disabled={btnDisabled}
            class="py-4 px-16 rounded-lg text-white font-bold transition
                {btnDisabled ? 'bg-gray-200 text-gray-400' : 'bg-indigo-700'}"
            >
            Upload
        </button>
    </div>
</form>