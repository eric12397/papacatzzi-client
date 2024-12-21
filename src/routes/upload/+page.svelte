<script lang="ts">
	import { goto } from "$app/navigation";
	import { imageStore } from "$lib/stores/image";
	import { get } from "svelte/store";

    let formData: CreateSighting = $state({
        Reporter: "",
        PhotoURL:    "",
        Animal:      "",
        Description: "",
        Latitude:    0,
        Longitude:   0,
        Timestamp: Date.now()
    })
    
    let image = get(imageStore)
    if (image) {
        formData.PhotoURL = image.src
        formData.Latitude = image.latitude
        formData.Longitude = image.longitude
        formData.Timestamp = image.timestamp
    }

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
    {#if image?.src}
        <img src={image.src} alt="Preview" style="max-width: 100%; height: auto;" />
    {/if}

    <label>
        Animal:
        <select name="animal" id="animalType" bind:value={formData.Animal}>
            <option>Cat</option>
            <option>Dog</option>
        </select>
    </label>

    <label>
        Description:
        <textarea bind:value={formData.Description} placeholder="Enter details about the photo"></textarea>
    </label>

    <input hidden bind:value={formData.Reporter}>

    <button class="p-6" onclick={handleSubmit}>Upload</button>
</form>