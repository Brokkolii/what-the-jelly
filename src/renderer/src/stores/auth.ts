import { derived, writable } from 'svelte/store'
import type { JellyfinAuthResponse } from '../../../shared/types/jellyfin'

export const authStore = writable<JellyfinAuthResponse>({
    AccessToken: null,
    ServerId: null,
    SessionInfo: null,
    User: null
})

// can no export derived
export const isLoggedIn = derived(authStore, ($auth) => !!$auth?.AccessToken)

export async function login(username: string, password: string) {
    const result = await window.api.authenticateUserByName(username, password)
    authStore.set(result)
    return result
}

export function logout() {
    // TODO: clear persisted accessToken
    authStore.update((auth) => {
        auth.AccessToken = null
        auth.SessionInfo = null
        auth.User = null
        return auth
    })
}
