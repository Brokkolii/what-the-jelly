export type JellyfinAuthResponse = {
    AccessToken: string | null
    ServerId: string | null
    SessionInfo: JellyfinSessionInfo | null
    User: JellyfinUser | null
}

type JellyfinUser = {
    Id: string
    Name: string
}

type JellyfinSessionInfo = {
    Id: string
}
