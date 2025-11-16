import { writable } from 'svelte/store'

export const hasConnectionToServerStore = writable<boolean>(false)

export async function checkConnectionToServer(): Promise<boolean> {
    const connection = await window.api.hasConnectionToServer()
    hasConnectionToServerStore.set(connection)
    return connection
}

export async function setBaseUrl(baseUrl: string): Promise<void> {
    return window.api.setBaseUrl(baseUrl)
}
