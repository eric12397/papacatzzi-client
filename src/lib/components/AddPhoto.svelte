<script lang="ts">
	import { image } from "$lib/states/image.svelte";
    import { getCurrentPosition } from "$lib/utils/currPos";
	import imageCompression from "browser-image-compression";
	import exifr from "exifr";

    let { onSuccess }: { onSuccess?: () => void } = $props()

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
            const coordsFound = (output && output.latitude && output.longitude)
            const timeDiff = Date.now() - file.lastModified
            const isImageFromCamera = timeDiff <= 60000 // is photo taken within last 60 secs
            let err = ""

            if (coordsFound) {
                image.latitude = output.latitude
                image.longitude = output.longitude
                image.timestamp = output.DateTimeOriginal
            }
            else if (!coordsFound && isImageFromCamera) {
                // fallback to grabbing user's current position
                const currPos = await getCurrentPosition()
                image.latitude = currPos.coords.latitude
                image.longitude = currPos.coords.longitude
                image.timestamp = currPos.timestamp
            }
            else {
                err = "No coordinates found."
                alert(err)
            }

            if (err) throw new Error(err);
            image.photoURL = URL.createObjectURL(compressed);

             // callback function if passed in as prop
            if (onSuccess) onSuccess()

        } catch (e) {
            console.error(e)
        }
    }
</script>

<input
    id="fileInput"
    type="file"
    accept="image/*"
    style="display: none;"
    onchange={handleFileInput}
/>