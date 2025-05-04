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
    timestamp:   Date
}

type BeginSignUpRequest = {
    email: string
}

type VerifySignUpRequest = {
    email: string
    code: string
}

type FinishSignUpRequest = {
    email: string
    username: string
    password: string
}

type LoginRequest = {
    email: string
    password: string
}

type ForgotPasswordRequest = {
    email: string
}

type ResetPasswordRequest = {
    token: string
    newPassword: string
}

type User = {
    id: string
    email: string
}

type JwtExpiration = {
    exp: number
}

type JwtPayload = User & JwtExpiration