import { writable } from 'svelte/store'
import type { JellyfinUser } from '../../../shared/types/jellyfin'

export const userStore = writable<JellyfinUser | null>(null)

export async function login(username: string, password: string) {
    const user = await window.api.authenticateUserByName(username, password)
    userStore.set(user)
    return user
}

export async function getUser() {
    const user = await window.api.getUser()
    userStore.set(user)
    return user
}

export async function logout() {
    await window.api.logout()
    userStore.set(null)
}
