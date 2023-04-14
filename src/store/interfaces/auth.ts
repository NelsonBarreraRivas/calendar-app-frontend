export type status =
    | 'checking'
    | 'not-authenticated'
    | 'authenticated'

export interface initialStateAuth {
    status: status
    user: { name: string, uid: string }
    errorMessage?: string | undefined
    successMessage?: string | undefined
}

export interface Login {
    email: string,
    password: string
}

export interface Register {
    email: string,
    password: string,
    name: string
}

export interface EventResponse {
    event: {
        end: Date
        id: string
        notes: string
        start: Date
        title: string
        user: string
    }
}