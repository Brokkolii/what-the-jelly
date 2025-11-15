import type { JellyfinAuthResponse } from '../../../shared/types/jellyfin'

export const authStore = $state<JellyfinAuthResponse>({
    AccessToken: null,
    ServerId: null,
    SessionInfo: null,
    User: null
})

// can no export derived
// export const isLoggedIn = $derived(!!authStore.AccessToken)

export async function login(username: string, password: string) {
    const result = await window.api.authenticateUserByName(username, password)
    authStore.AccessToken = result.AccessToken
    authStore.ServerId = result.ServerId
    authStore.SessionInfo = result.SessionInfo
    authStore.User = result.User
    return result
}
