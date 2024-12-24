<script lang="ts">
	import { goto } from "$app/navigation";
	import AddPhoto from "$lib/components/AddPhoto.svelte";
	import { imageStore } from "$lib/stores/image";

    let formData: CreateSighting = $state({
        Reporter: "",
        PhotoURL:    "",
        Animal:      "",
        Description: "",
        Latitude:    0,
        Longitude:   0,
        Timestamp: Date.now()
    })
    
    imageStore.subscribe((image) => {
        if (image) {
            formData.PhotoURL = image.src
            formData.Latitude = image.latitude
            formData.Longitude = image.longitude
            formData.Timestamp = image.timestamp
        }
    })

    const handleSubmit = async (event: any) => {
        event.preventDefault()
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
</script>

<form>
    <div class="flex flex-col space-y-4 p-3">
        <div class="mt-3">
            <h1 class="font-bold text-center text-xl">Report a sighting:</h1>
        </div>
        
        <textarea
            class=" rounded-lg border-gray-300"
            placeholder="Enter details about the photo"
            bind:value={formData.Description}>
        </textarea>
       
        {#if formData.PhotoURL}
            <div class="w-40 h-40 rounded-lg overflow-hidden bg-gray-100">
                <img 
                    class="w-full h-full object-cover"
                    src={formData.PhotoURL} 
                    alt="Preview" 
                    style=""  
                />
            </div>
        {:else}
            <label for="fileInput" class="button">📷</label>
            <AddPhoto />
        {/if}

        <label>
            Animal:
            <select 
                class="w-24 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3"
                name="animal" id="animalType" bind:value={formData.Animal}>
                <option>Cat</option>
                <option>Dog</option>
            </select>
        </label>

        <input hidden bind:value={formData.Reporter}>

        <button class="py-4 px-16 rounded-lg bg-indigo-700 text-white" onclick={handleSubmit}>Upload</button>
    </div>
</form>