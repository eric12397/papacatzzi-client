<script lang="ts">
	import { goto } from "$app/navigation";
	import { imageStore, type ImageData } from "$lib/stores/image";
	import imageCompression from "browser-image-compression";
	import exifr from "exifr";

    let image: ImageData = $state({
        src: "",
        longitude: 0,
        latitude: 0,
        timestamp: Date.now()
    })

    const handleFileInput = async (event: Event) => {   
        const target = event.target as HTMLInputElement;
        if (!target.files) return
        if (!target.files[0]) return

        const file = target.files[0]
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 500,
                useWebWorker: true,
            }
            const compressed = await imageCompression(file, options)
            const output = await exifr.parse(file)
            
            if (output.latitude && output.longitude) {
                image.src = URL.createObjectURL(compressed);
                image.latitude = output.latitude
                image.longitude = output.longitude
                image.timestamp = output.DateTimeOriginal
                imageStore.set(image)
                goto("/upload")
            } else {
                alert("Coordinates not found.")
            }
        } catch (e) {
            console.error(e)
        }
        
    }
</script>

<div>
    <label for="fileInput" class="button">📷</label>
    <input
        id="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        style="display: none;"
        onchange={handleFileInput}
    />
</div>