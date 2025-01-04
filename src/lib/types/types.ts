type SightingCoordinates = {
    id: number
    latitude: number
    longitude: number
    timestamp: number
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
    reporter:    string
    photoURL:    string
    animal:      string
    description: string
    latitude:    number
    longitude:   number
    timestamp:   number
}

type CreateUser = {
    username: string
    email: string
    password: string
}