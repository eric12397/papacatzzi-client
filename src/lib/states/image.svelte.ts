export class ImageState {
    photoURL: string = $state("")
    latitude: number = $state(0)
    longitude: number = $state(0)
    timestamp: number = $state(Date.now())

    clearImage = () => {
        this.photoURL = ""
        this.latitude = 0
        this.longitude = 0
        this.timestamp = Date.now()
    }

    toJSON = () => {
        return {
            photoURL: this.photoURL,
            latitude: this.latitude,
            longitude: this.longitude,
            timestamp: this.timestamp,
        }
    }
}

export const image = new ImageState()
