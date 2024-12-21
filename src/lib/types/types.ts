type SightingCoordinates = {
    ID: number
    Latitude: number
    Longitude: number
    Timestamp: number
}

type SightingDetails = {
    ID: number
    Animal: string
    Reporter: string
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