type SightingCoordinates = {
    ID: number
    Latitude: number
    Longitude: number
    Timestamp: number
}

type SightingDetails = {
    id: number
    animal: string
    description: string
    reporter: string
    photoURL: string
    timestamp: number
}

type CreateSighting = {
    Reporter:    string
    PhotoURL:    string
    Animal:      string
    Description: string
    Latitude:    number
    Longitude:   number
    Timestamp:   number
}