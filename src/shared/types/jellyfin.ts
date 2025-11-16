export type JellyfinAuthResponse = {
    AccessToken: string
    ServerId: string
    SessionInfo: JellyfinSessionInfo
    User: JellyfinUser
}

export type JellyfinUser = {
    Id: string
    Name: string
}

type JellyfinSessionInfo = {
    Id: string
}
