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

    const getCurrentPosition = () => {
		return new Promise<GeolocationPosition>((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject)
		);
	}

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
            image.src = URL.createObjectURL(compressed);

            const output = await exifr.parse(file)
            const coordsFound = (output.latitude && output.longitude)
            const timeDiff = Date.now() - file.lastModified
            const isImageFromCamera = timeDiff <= 60000 // is photo taken within last 60 secs
            
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
                const err = `No coordinate data was found.`
                alert(err)
                throw new Error(err);
            }
        
            imageStore.set(image)
            goto("/upload")

        } catch (e) {
            console.error(e)
        }
    }
</script>

<input
    id="fileInput"
    type="file"
    accept="image/*"
    capture="environment"
    style="display: none;"
    onchange={handleFileInput}
/>