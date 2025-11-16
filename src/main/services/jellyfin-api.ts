import { app } from 'electron'
import { config, saveConfig } from '../config'
import { platform } from 'os'
import { randomUUID } from 'crypto'
import { JellyfinAuthResponse } from '../../shared/types/jellyfin'

class JellyfinApi {
    // TODO develop process for setting base url
    private baseUrl = config?.jellyfin?.baseUrl
    private accessToken: string | null = null

    public async authenticateUserByName(
        username: string,
        password: string
    ): Promise<JellyfinAuthResponse> {
        const response = await fetch(`${this.baseUrl}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.getAuthHeader()
            },
            body: JSON.stringify({ Username: username, Pw: password })
        })
        if (response.status !== 200) {
            console.error(response.status, response.statusText)
            throw new Error(`Authentication failed (${response.status} ${response.statusText})`)
        } else {
            const result: Promise<JellyfinAuthResponse> = response.json()
            return result
        }
    }

    private getAuthHeader(): string {
        const client = 'WhatTheJelly'
        const device = platform()
        const deviceId = this.getOrCreateDeviceId()
        const version = app.getVersion()
        const accessToken = this.accessToken
        if (accessToken) {
            return `MediaBrowser Client="${client}", Device="${device}", DeviceId="${deviceId}", Version="${version}"`
        } else {
            return `MediaBrowser Client="${client}", Device="${device}", DeviceId="${deviceId}", Version="${version}", Token="${accessToken}"`
        }
    }

    private getOrCreateDeviceId(): string {
        if (config?.deviceId) return config.deviceId
        const deviceId = randomUUID()
        saveConfig({ deviceId })
        return deviceId
    }
}

export const jellyfinApi = new JellyfinApi()
