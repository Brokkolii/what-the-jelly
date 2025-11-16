import { app } from 'electron'
import { config, saveConfig } from '../config'
import { platform } from 'os'
import { randomUUID } from 'crypto'
import { JellyfinAuthResponse, JellyfinUser } from '../../shared/types/jellyfin'

class JellyfinApi {
    // TODO develop process for setting base url
    private baseUrl = config?.baseUrl
    private accessToken: string | null = null

    public async authenticateUserByName(username: string, password: string): Promise<JellyfinUser> {
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
            const result: JellyfinAuthResponse = await response.json()
            // TODO save auth token
            return result.User
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

    public async logout(): Promise<void> {
        // TODO remove authToken
        // TODO sessions/logout
    }

    public async hasConnectionToServer(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/System/Ping`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getAuthHeader()
                }
            })
            return response.status === 200
        } catch {
            return false
        }
    }

    public async getUser(): Promise<JellyfinUser | null> {
        const response = await fetch(`${this.baseUrl}/User/Me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.getAuthHeader()
            }
        })
        if (response.status !== 200) {
            console.error(response.status, response.statusText)
            return null
        } else {
            return response.json()
        }
    }

    public async setBaseUrl(baseUrl: string): Promise<void> {
        try {
            const response = await fetch(`${baseUrl}/System/Ping`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getAuthHeader()
                }
            })
            if (response.status === 200) {
                saveConfig({ baseUrl })
            }
        } catch {
            throw new Error(`Invalid Base Url`)
        }
    }
}

export const jellyfinApi = new JellyfinApi()
