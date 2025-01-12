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

type BeginSignUp = {
    email: string
}

type VerifySignUp = {
    email: string
    code: string
}

type FinishSignUp = {
    email: string
    username: string
    password: string
}